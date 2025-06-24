package xmlparsing

import (
	"encoding/xml"
	"io"
	"iter"
	"strings"
)

type Parser struct {
	Stack        []*Token
	LastCharData []*Token
	pipeline     []*Token
	decoder      *xml.Decoder
}

func NewFromTokens(tokens []*Token) *Parser {
	return &Parser{
		Stack:        make([]*Token, 0, len(tokens)),
		LastCharData: make([]*Token, 0, len(tokens)),
		pipeline:     tokens,
		decoder:      nil, // No decoder needed for pre-parsed tokens
	}
}

func NewParser(xmlData string) *Parser {
	return &Parser{
		decoder: xml.NewDecoder(strings.NewReader(xmlData)),
	}
}

func (p *Parser) GetStack() []*Token {
	return p.Stack
}

func (p *Parser) Pipeline() []*Token {
	return p.pipeline
}

func (p *Parser) PeekFrom(index int) iter.Seq2[*Token, error] {
	if index < 0 || index >= len(p.pipeline) {
		return func(yield func(*Token, error) bool) {
			yield(nil, nil) // No tokens to yield
			return
		}
	}

	return func(yield func(*Token, error) bool) {
		for i := index; i < len(p.pipeline); i++ {
			if !yield(p.pipeline[i], nil) {
				return
			}
		}

		for {
			token, err := p.Token()
			if err != nil {
				yield(nil, err)
				return
			}

			if token == nil {
				// EOF
				return
			}

			if !yield(token, nil) {
				return
			}
		}
	}
}

func (p *Parser) Reset() {
	p.Stack = []*Token{}
}

func (p *Parser) Token() (*Token, error) {
	if p.decoder == nil {
		return nil, nil // No more tokens to parse
	}

	start := p.decoder.InputOffset()
	token, err := p.decoder.Token()
	end := p.decoder.InputOffset()
	if err == io.EOF {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	var customToken Token = Token{
		parser:      p,
		Index:       len(p.pipeline),
		Inner:       token,
		StartOffset: start + 1,
		EndOffset:   end,
		Stack:       make([]*Token, len(p.Stack)),
	}

	// INFO: these are just pointers, so it should go fast
	copy(customToken.Stack, p.Stack)

	switch t := token.(type) {
	case xml.StartElement:
		attr := mapAttributes(t.Attr)
		customToken.Name = t.Name.Local
		customToken.Attributes = attr
		customToken.Type = StartElement
		if len(p.Stack) > 0 && !p.Stack[len(p.Stack)-1].childrenParsed {
			p.Stack[len(p.Stack)-1].children = append(p.Stack[len(p.Stack)-1].children, &customToken)
		}
		p.Stack = append(p.Stack, &customToken)

	case xml.EndElement:
		if len(p.Stack) > 0 {
			element := p.Stack[len(p.Stack)-1]
			element.childrenParsed = true
			element.chardataParsed = true
			p.Stack = p.Stack[:len(p.Stack)-1]
		}
		customToken.Name = t.Name.Local
		customToken.Attributes = map[string]string{}
		customToken.Type = EndElement

	case xml.CharData:
		text := string(t)
		if text != "" && len(p.Stack) > 0 {
			for i := range p.Stack {
				if !p.Stack[i].chardataParsed {
					p.Stack[i].charData += text
				}
			}
		}
		customToken.Data = text
		customToken.Type = CharData
		p.LastCharData = append(p.LastCharData, &customToken)

	case xml.Comment:
		customToken.Type = Comment
		customToken.Data = string(t)

	case xml.ProcInst:
		customToken.Name = t.Target
		customToken.Data = string(t.Inst)
		customToken.Type = ProcInst

	case xml.Directive:
		customToken.Data = string(t)
		customToken.Type = Directive
	}

	p.pipeline = append(p.pipeline, &customToken)
	return &customToken, nil
}

func (p *Parser) Previous(index int) (tokens []*Token) {
	if index < 0 || index >= len(p.pipeline) {
		return
	}

	return p.pipeline[:index]
}

func (p *Parser) All() ([]*Token, error) {
	for _, err := range p.Iterate() {
		if err != nil {
			return nil, err
		}
	}
	return p.pipeline, nil
}

func (p *Parser) Iterate() iter.Seq2[*Token, error] {
	var cursor int
	return func(yield func(*Token, error) bool) {
		for {
			var token *Token
			// INFO: cursor should be max. len(p.pipeline)
			if cursor >= len(p.pipeline) {
				t, err := p.Token()
				if err != nil {
					yield(nil, err)
					return
				}
				if t == nil {
					return // EOF
				}

				token = t
			} else {
				token = p.pipeline[cursor]
			}

			cursor++
			if !yield(token, nil) {
				return
			}
		}
	}
}

// mapAttributes converts xml.Attr to a map[string]string.
func mapAttributes(attrs []xml.Attr) map[string]string {
	attrMap := make(map[string]string)
	for _, attr := range attrs {
		attrMap[attr.Name.Local] = attr.Value
	}
	return attrMap
}
