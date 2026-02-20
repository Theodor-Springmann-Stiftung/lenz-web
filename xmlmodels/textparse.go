package xmlmodels

import (
	"encoding/xml"
	"strings"
)

type TokenType int

const (
	StartElement TokenType = iota
	EndElement
	CharData
)

type LineType int

const (
	Continuation LineType = iota
	First
	Fist     = First // backward-compatible alias for historical typo
	Semantic         // Indent=0 , still type="break"
	Indent           // Indent>0, type dosent matter
	Empty            // no line content, after that, an empty line
)

type Token struct {
	Type  TokenType
	Name  string
	Attrs map[string]string
	Value string
	// INFO: true means synthetic token without corresponding XML token.
	Synth bool
}

type Line struct {
	Type   LineType
	Indent int
	Text   string
	Tokens []Token
}

type Page struct {
	Number    int
	Lines     []Line
	Sidenotes []Sidenote
}

type Sidenote struct {
	Position   string
	Annotation string
	Lines      []Line
}

type lineAccumulator struct {
	curLine      *Line
	openStack    []Token
	implicitType LineType
	hasAnyLine   bool
	appendLine   func(Line)
	hasCharData  bool
}

func newLineAccumulator(implicitType LineType, appendLine func(Line)) *lineAccumulator {
	return &lineAccumulator{
		implicitType: implicitType,
		appendLine:   appendLine,
	}
}

func (a *lineAccumulator) setImplicitType(lt LineType) {
	a.implicitType = lt
}

func (a *lineAccumulator) startLine(lt LineType, indent int) {
	a.curLine = &Line{Type: lt, Indent: indent}
	a.hasCharData = false
	for _, st := range a.openStack {
		a.curLine.Tokens = append(a.curLine.Tokens, Token{
			Type:  StartElement,
			Name:  st.Name,
			Attrs: st.Attrs,
			Synth: true,
		})
	}
}

func (a *lineAccumulator) ensureLine() {
	if a.curLine != nil {
		return
	}
	a.startLine(a.implicitType, 0)
	if a.implicitType == First {
		a.implicitType = Continuation
	}
}

func (a *lineAccumulator) closeLine() {
	if a.curLine == nil {
		a.ensureLine()
	}
	a.trimRightWhitespace()
	for i := len(a.openStack) - 1; i >= 0; i-- {
		a.curLine.Tokens = append(a.curLine.Tokens, Token{
			Type:  EndElement,
			Name:  a.openStack[i].Name,
			Synth: true,
		})
	}
	a.curLine.Text = lineTextFromTokens(a.curLine.Tokens)
	a.appendLine(*a.curLine)
	a.hasAnyLine = true
	a.curLine = nil
}

func (a *lineAccumulator) handleLineMarker(se xml.StartElement) {
	lt, indent, emitEmpty := parseLineMarker(se)
	if a.curLine != nil {
		a.closeLine()
	}
	if emitEmpty {
		a.startLine(Empty, 0)
		a.closeLine()
		a.implicitType = Continuation
		return
	}
	a.startLine(lt, indent)
	a.implicitType = Continuation
}

func (a *lineAccumulator) appendStart(name string, attrs map[string]string) {
	a.ensureLine()
	a.curLine.Tokens = append(a.curLine.Tokens, Token{
		Type:  StartElement,
		Name:  name,
		Attrs: attrs,
	})
	a.openStack = append(a.openStack, Token{
		Type:  StartElement,
		Name:  name,
		Attrs: attrs,
	})
}

func (a *lineAccumulator) appendEnd(name string) {
	a.ensureLine()
	a.curLine.Tokens = append(a.curLine.Tokens, Token{
		Type: EndElement,
		Name: name,
	})
	if len(a.openStack) == 0 {
		return
	}
	if a.openStack[len(a.openStack)-1].Name == name {
		a.openStack = a.openStack[:len(a.openStack)-1]
		return
	}
	for i := len(a.openStack) - 1; i >= 0; i-- {
		if a.openStack[i].Name == name {
			a.openStack = append(a.openStack[:i], a.openStack[i+1:]...)
			return
		}
	}
}

func (a *lineAccumulator) appendText(s string) {
	a.ensureLine()
	if !a.hasCharData {
		s = trimLeftASCIISpace(s)
	}
	if s == "" {
		return
	}
	a.curLine.Tokens = append(a.curLine.Tokens, Token{
		Type:  CharData,
		Value: s,
	})
	a.hasCharData = true
}

func (a *lineAccumulator) isAtLineStart() bool {
	if a.curLine == nil {
		return true
	}
	for _, tok := range a.curLine.Tokens {
		if tok.Type == StartElement && tok.Synth {
			continue
		}
		return false
	}
	return true
}

func (a *lineAccumulator) trimRightWhitespace() {
	if a.curLine == nil {
		return
	}
	toks := a.curLine.Tokens
	for {
		lastCharIdx := -1
		for i := len(toks) - 1; i >= 0; i-- {
			if toks[i].Type == CharData {
				lastCharIdx = i
				break
			}
		}
		if lastCharIdx < 0 {
			break
		}
		trimmed := trimRightASCIISpace(toks[lastCharIdx].Value)
		if trimmed == "" {
			toks = append(toks[:lastCharIdx], toks[lastCharIdx+1:]...)
			continue
		}
		toks[lastCharIdx].Value = trimmed
		break
	}
	a.curLine.Tokens = toks
}

func lineTextFromTokens(tokens []Token) string {
	var b strings.Builder
	for _, tok := range tokens {
		if tok.Type == CharData {
			b.WriteString(tok.Value)
		}
	}
	return b.String()
}

func parseBlockLines(dec *xml.Decoder, endLocalName string) ([]Line, error) {
	lines := make([]Line, 0, 8)
	acc := newLineAccumulator(First, func(line Line) {
		lines = append(lines, line)
	})

	for {
		tok, err := dec.Token()
		if err != nil {
			return nil, err
		}

		switch t := tok.(type) {
		case xml.StartElement:
			name := t.Name.Local
			if name == "line" {
				acc.handleLineMarker(t)
				continue
			}
			if isTransparentWrapper(name) {
				continue
			}
			acc.appendStart(name, attrsToMap(t.Attr))

		case xml.EndElement:
			name := t.Name.Local
			if isTransparentWrapper(name) {
				continue
			}
			if name == endLocalName {
				if acc.curLine != nil {
					acc.closeLine()
				}
				return lines, nil
			}
			if name == "line" {
				continue
			}
			acc.appendEnd(name)

		case xml.CharData:
			s := string([]byte(t))
			if isOnlyASCIISpace(s) {
				if acc.isAtLineStart() {
					continue
				}
				s = " "
			}
			acc.appendText(s)
		}
	}
}
