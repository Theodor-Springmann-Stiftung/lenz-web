package xmlparsing

import (
	"encoding/xml"
	"iter"
	"strings"
)

type TokenType int

const (
	StartElement TokenType = iota
	EndElement
	CharData
	Comment
	ProcInst
	Directive
)

type Token struct {
	Name           string
	Attributes     map[string]string
	Inner          xml.Token
	Type           TokenType
	Data           string
	Stack          []*Token
	StartOffset    int64
	EndOffset      int64
	Index          int
	charData       string
	children       []*Token
	parser         *Parser
	childrenParsed bool
	chardataParsed bool
}

func (t *Token) String() string {
	builder := strings.Builder{}
	return builder.String()
}

func (t *Token) Element() (tokens []*Token) {
	if t.Type != StartElement {
		return
	}

	for token, err := range t.parser.PeekFrom(t.Index) {
		if err != nil || token == nil {
			return tokens
		}

		tokens = append(tokens, token)
		if token.Type == EndElement && token.Name == t.Name {
			return tokens
		}
	}

	return
}

func (t *Token) Next() iter.Seq2[*Token, error] {
	return t.parser.PeekFrom(t.Index)
}

func (t *Token) Previous() (tokens []*Token) {
	if t.Index <= 0 {
		return
	}

	return t.parser.Previous(t.Index)
}

func (t *Token) Children() (tokens []*Token) {
	if t.childrenParsed {
		return t.children
	}

	tokens = t.Element()
	if len(tokens) == 0 {
		return
	}

	for _, token := range tokens {
		if token.Type == StartElement {
			t.children = append(t.children, token)
		}
	}

	t.childrenParsed = true
	return t.children
}

func (t *Token) CharData() string {
	if t.Type == CharData || t.Type == ProcInst || t.Type == Comment || t.Type == Directive {
		return t.Data
	}

	if t.chardataParsed {
		return t.charData
	}
	tokens := t.Element()
	if len(tokens) == 0 {
		return ""
	}

	var builder strings.Builder
	for _, token := range tokens {
		if token.Type == CharData {
			builder.WriteString(token.Data)
		}
	}

	t.chardataParsed = true
	t.charData = builder.String()
	return builder.String()
}

func (t *Token) SubParser() *Parser {
	if t.Type != StartElement {
		return nil
	}

	tokens := t.Element()

	return NewFromTokens(tokens)
}
