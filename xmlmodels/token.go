package xmlmodels

import (
	"encoding/xml"
	"iter"
	"strings"
)

// Token wraps xml.Token with additional parsing context
type Token struct {
	Index      int                 // Position in token array
	Stack      []string            // Element names in the stack at this token
	Attributes map[string]string   // Attributes for StartElement tokens
}

// NewTokenFromXMLToken creates a Token from xml.Token with context
func NewTokenFromXMLToken(xmlToken xml.Token, stack []string, index int) Token {
	token := Token{
		Index:      index,
		Stack:      make([]string, len(stack)),
		Attributes: make(map[string]string),
	}

	copy(token.Stack, stack)

	// Extract attributes if this is a StartElement
	if startElement, ok := xmlToken.(xml.StartElement); ok {
		for _, attr := range startElement.Attr {
			token.Attributes[attr.Name.Local] = attr.Value
		}
	}

	return token
}

type LetterTokenType int

const (
	LetterStartElement LetterTokenType = iota
	LetterEndElement
	LetterCharData
	LetterComment
	LetterProcInst
	LetterDirective
)

// LetterToken wraps xml.Token with additional context for Letter/Page parsing
type LetterToken struct {
	Name        string
	Attributes  map[string]string
	Inner       xml.Token
	Type        LetterTokenType
	Data        string
	Stack       []*LetterToken
	Index       int
	PageIndex   int // Which page this token belongs to
	Letter      int // Which letter this token belongs to

	// Navigation fields
	charData       string
	children       []*LetterToken
	childrenParsed bool
	chardataParsed bool
	parser         *LetterParser
}

// LetterParser wraps a slice of LetterTokens with navigation capabilities
type LetterParser struct {
	Stack    []*LetterToken
	pipeline []*LetterToken
	letter   int
	pageMap  map[int]int // Maps page number to starting token index
}

// NewLetterParser creates a parser from xml.Token slice
func NewLetterParser(tokens []xml.Token, letter int, pageIndex int) *LetterParser {
	parser := &LetterParser{
		Stack:   make([]*LetterToken, 0),
		letter:  letter,
		pageMap: make(map[int]int),
	}

	stack := make([]*LetterToken, 0)

	for i, token := range tokens {
		letterToken := &LetterToken{
			Inner:     xml.CopyToken(token),
			Index:     i,
			PageIndex: pageIndex,
			Letter:    letter,
			Stack:     make([]*LetterToken, len(stack)),
			parser:    parser,
		}

		// Copy current stack
		copy(letterToken.Stack, stack)

		switch t := token.(type) {
		case xml.StartElement:
			letterToken.Name = t.Name.Local
			letterToken.Attributes = mapXMLAttributes(t.Attr)
			letterToken.Type = LetterStartElement

			// Add to parent's children if not parsed yet
			if len(stack) > 0 && !stack[len(stack)-1].childrenParsed {
				stack[len(stack)-1].children = append(stack[len(stack)-1].children, letterToken)
			}
			stack = append(stack, letterToken)

		case xml.EndElement:
			if len(stack) > 0 {
				element := stack[len(stack)-1]
				element.childrenParsed = true
				element.chardataParsed = true
				stack = stack[:len(stack)-1]
			}
			letterToken.Name = t.Name.Local
			letterToken.Attributes = make(map[string]string)
			letterToken.Type = LetterEndElement

		case xml.CharData:
			text := string(t)
			if text != "" && len(stack) > 0 {
				for i := range stack {
					if !stack[i].chardataParsed {
						stack[i].charData += text
					}
				}
			}
			letterToken.Data = text
			letterToken.Type = LetterCharData

		case xml.Comment:
			letterToken.Type = LetterComment
			letterToken.Data = string(t)

		case xml.ProcInst:
			letterToken.Name = t.Target
			letterToken.Data = string(t.Inst)
			letterToken.Type = LetterProcInst

		case xml.Directive:
			letterToken.Data = string(t)
			letterToken.Type = LetterDirective
		}

		parser.pipeline = append(parser.pipeline, letterToken)
	}

	return parser
}

// GetStack returns current parsing stack
func (p *LetterParser) GetStack() []*LetterToken {
	return p.Stack
}

// Pipeline returns all tokens
func (p *LetterParser) Pipeline() []*LetterToken {
	return p.pipeline
}

// TokenAt returns token at specific index
func (p *LetterParser) TokenAt(index int) *LetterToken {
	if index < 0 || index >= len(p.pipeline) {
		return nil
	}
	return p.pipeline[index]
}

// IterateFrom creates iterator starting from specific index
func (p *LetterParser) IterateFrom(index int) iter.Seq2[*LetterToken, error] {
	return func(yield func(*LetterToken, error) bool) {
		for i := index; i < len(p.pipeline); i++ {
			if !yield(p.pipeline[i], nil) {
				return
			}
		}
	}
}

// Iterate over all tokens
func (p *LetterParser) Iterate() iter.Seq2[*LetterToken, error] {
	return p.IterateFrom(0)
}

// Previous returns tokens before given index
func (p *LetterParser) Previous(index int) []*LetterToken {
	if index <= 0 || index > len(p.pipeline) {
		return nil
	}
	return p.pipeline[:index]
}

// LetterToken methods

// String returns string representation
func (t *LetterToken) String() string {
	builder := strings.Builder{}
	switch t.Type {
	case LetterStartElement:
		builder.WriteString("<" + t.Name)
		for k, v := range t.Attributes {
			builder.WriteString(" " + k + `="` + v + `"`)
		}
		builder.WriteString(">")
	case LetterEndElement:
		builder.WriteString("</" + t.Name + ">")
	case LetterCharData:
		builder.WriteString(t.Data)
	case LetterComment:
		builder.WriteString("<!--" + t.Data + "-->")
	}
	return builder.String()
}

// Element returns all tokens from start to matching end element
func (t *LetterToken) Element() []*LetterToken {
	if t.Type != LetterStartElement {
		return nil
	}

	var tokens []*LetterToken
	depth := 0

	for token, _ := range t.parser.IterateFrom(t.Index) {
		tokens = append(tokens, token)

		if token.Type == LetterStartElement && token.Name == t.Name {
			depth++
		} else if token.Type == LetterEndElement && token.Name == t.Name {
			depth--
			if depth == 0 {
				return tokens
			}
		}
	}

	return tokens
}

// Children returns direct child elements
func (t *LetterToken) Children() []*LetterToken {
	if t.childrenParsed {
		return t.children
	}

	if t.Type != LetterStartElement {
		return nil
	}

	element := t.Element()
	if len(element) <= 1 {
		return nil
	}

	// Skip first (self) and find direct children
	depth := 0
	for _, token := range element[1:] { // Skip self
		if token.Type == LetterStartElement {
			if depth == 0 {
				t.children = append(t.children, token)
			}
			depth++
		} else if token.Type == LetterEndElement {
			depth--
		}
	}

	t.childrenParsed = true
	return t.children
}

// CharData returns character data content
func (t *LetterToken) CharData() string {
	if t.Type == LetterCharData || t.Type == LetterComment {
		return t.Data
	}

	if t.chardataParsed {
		return t.charData
	}

	if t.Type != LetterStartElement {
		return ""
	}

	element := t.Element()
	if len(element) == 0 {
		return ""
	}

	var builder strings.Builder
	for _, token := range element {
		if token.Type == LetterCharData {
			builder.WriteString(token.Data)
		}
	}

	t.chardataParsed = true
	t.charData = builder.String()
	return t.charData
}

// Next returns iterator from next token
func (t *LetterToken) Next() iter.Seq2[*LetterToken, error] {
	return t.parser.IterateFrom(t.Index + 1)
}

// Previous returns tokens before this one
func (t *LetterToken) Previous() []*LetterToken {
	return t.parser.Previous(t.Index)
}

// FindByName finds first child element with given name
func (t *LetterToken) FindByName(name string) *LetterToken {
	for _, child := range t.Children() {
		if child.Name == name {
			return child
		}
	}
	return nil
}

// FindAllByName finds all child elements with given name
func (t *LetterToken) FindAllByName(name string) []*LetterToken {
	var result []*LetterToken
	for _, child := range t.Children() {
		if child.Name == name {
			result = append(result, child)
		}
	}
	return result
}

// GetAttribute returns attribute value
func (t *LetterToken) GetAttribute(name string) string {
	if t.Attributes == nil {
		return ""
	}
	return t.Attributes[name]
}

// GetStackDepth returns current nesting depth
func (t *LetterToken) GetStackDepth() int {
	return len(t.Stack)
}

// InPage checks if token belongs to specific page
func (t *LetterToken) InPage(pageNo int) bool {
	return t.PageIndex == pageNo
}

// mapXMLAttributes converts xml.Attr to map[string]string
func mapXMLAttributes(attrs []xml.Attr) map[string]string {
	attrMap := make(map[string]string)
	for _, attr := range attrs {
		attrMap[attr.Name.Local] = attr.Value
	}
	return attrMap
}