package xmlparsing

import (
	"iter"
	"strings"
)

// ParserHandler describes the callbacks a Parsed type invokes while walking
// through the XML token stream.
type ParserHandler[S any] interface {
	NewState() S
	OnOpenElement(*ParseState[S], *Token) error
	OnCloseElement(*ParseState[S], *Token) error
	OnText(*ParseState[S], *Token) error
	OnComment(*ParseState[S], *Token) error
}

// Parsed orchestrates converting raw XML into a handler-defined representation.
type Parsed[T ParserHandler[S], S any] struct {
	handler T
	state   ParseState[S]
	raw     string
}

// NewParsed builds a Parsed wrapper with the provided handler.
func NewParsed[T ParserHandler[S], S any](handler T) Parsed[T, S] {
	return Parsed[T, S]{handler: handler}
}

// ParseString feeds the handler with events generated from the supplied XML.
func (p *Parsed[T, S]) ParseString(xml string) error {
	p.raw = xml
	parser := NewParser(xml)
	state := ParseState[S]{
		state:   p.handler.NewState(),
		general: newGeneralState(parser),
	}

	for token, err := range parser.Iterate() {
		if err != nil {
			return err
		}
		if token == nil {
			continue
		}

		state.general.observe(token)

		switch token.Type {
		case StartElement:
			if err := p.handler.OnOpenElement(&state, token); err != nil {
				return err
			}
		case EndElement:
			if err := p.handler.OnCloseElement(&state, token); err != nil {
				return err
			}
		case CharData:
			// Skip empty whitespace blocks to mimic encoding/xml behaviour.
			if strings.TrimSpace(token.Data) == "" {
				continue
			}
			if err := p.handler.OnText(&state, token); err != nil {
				return err
			}
		case Comment:
			if err := p.handler.OnComment(&state, token); err != nil {
				return err
			}
		default:
			// Other token types are ignored for now.
		}
	}

	p.state = state
	return nil
}

// Raw returns the unprocessed XML.
func (p Parsed[T, S]) Raw() string {
	return p.raw
}

// State exposes the accumulated ParseState.
func (p *Parsed[T, S]) State() *ParseState[S] {
	return &p.state
}

// Data returns the handler-defined state value.
func (p *Parsed[T, S]) Data() S {
	return p.state.state
}

// Handler exposes the handler instance for downstream consumers.
func (p *Parsed[T, S]) Handler() *T {
	return &p.handler
}

// ParseState passes both handler-specific state and shared navigation helpers.
type ParseState[S any] struct {
	state   S
	general *GeneralState
}

// Data returns the handler-owned state.
func (p *ParseState[S]) Data() S {
	return p.state
}

// General exposes parser-wide helpers (tokens, peeking, etc.).
func (p *ParseState[S]) General() *GeneralState {
	return p.general
}

// GeneralState tracks all past tokens and enables look-back/peek helpers.
type GeneralState struct {
	tokens  []*Token
	parser  *Parser
	current *Token
}

func newGeneralState(parser *Parser) *GeneralState {
	return &GeneralState{
		parser: parser,
	}
}

func (g *GeneralState) observe(token *Token) {
	g.tokens = append(g.tokens, token)
	g.current = token
}

// Tokens returns all tokens seen so far.
func (g *GeneralState) Tokens() []*Token {
	return g.tokens
}

// Current returns the most recently processed token.
func (g *GeneralState) Current() *Token {
	return g.current
}

// Previous returns up to n previously processed tokens (latest first).
func (g *GeneralState) Previous(n int) []*Token {
	if n <= 0 || len(g.tokens) == 0 {
		return nil
	}

	if n > len(g.tokens) {
		n = len(g.tokens)
	}

	out := make([]*Token, 0, n)
	for i := 0; i < n; i++ {
		out = append(out, g.tokens[len(g.tokens)-1-i])
	}
	return out
}

// Peek exposes a cursor that yields upcoming tokens from the underlying parser.
func (g *GeneralState) Peek() iter.Seq2[*Token, error] {
	if g.current == nil {
		return func(yield func(*Token, error) bool) {
			yield(nil, nil)
		}
	}
	return g.parser.PeekFrom(g.current.Index + 1)
}
