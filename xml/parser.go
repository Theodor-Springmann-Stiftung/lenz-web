package xmlparsing

import (
	"encoding/xml"
	"io"
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

type Element struct {
	Name       string
	Attributes map[string]string
	CharData   string
}

type Token struct {
	Name       string
	Attributes map[string]string
	Inner      xml.Token
	Type       TokenType
	Data       string
}

type TokenResult[T any] struct {
	State T
	Token Token
	Stack []Element
}

func Iterate[T any](xmlData string, initialState T) iter.Seq2[*TokenResult[T], error] {
	decoder := xml.NewDecoder(strings.NewReader(xmlData))
	stack := []Element{}
	state := initialState
	return func(yield func(*TokenResult[T], error) bool) {
		for {
			token, err := decoder.Token()
			if err == io.EOF {
				return
			}
			if err != nil {
				yield(nil, err)
				return
			}

			var customToken Token
			switch t := token.(type) {
			case xml.StartElement:
				elem := Element{
					Name:       t.Name.Local,
					Attributes: mapAttributes(t.Attr),
					CharData:   "",
				}
				stack = append(stack, elem)
				customToken = Token{
					Name:       t.Name.Local,
					Attributes: elem.Attributes,
					Inner:      t,
					Type:       StartElement,
				}
			case xml.EndElement:
				if len(stack) > 0 {
					stack = stack[:len(stack)-1]
				}
				customToken = Token{Name: t.Name.Local, Inner: t, Type: EndElement}
			case xml.CharData:
				text := strings.TrimSpace(string(t))
				if text != "" && len(stack) > 0 {
					stack[len(stack)-1].CharData += text + " "
				}
				customToken = Token{
					Name:  "CharData",
					Inner: t,
					Data:  text,
					Type:  CharData,
				}
			case xml.Comment:
				customToken = Token{
					Name:  "Comment",
					Inner: t,
					Data:  string(t),
					Type:  Comment,
				}
			case xml.ProcInst:
				customToken = Token{
					Name:  t.Target,
					Inner: t,
					Data:  string(t.Inst),
					Type:  ProcInst,
				}
			case xml.Directive:
				customToken = Token{
					Name:  "Directive",
					Inner: t,
					Data:  string(t),
					Type:  Directive,
				}
			}

			result := &TokenResult[T]{
				State: state,
				Token: customToken,
				Stack: append([]Element{}, stack...),
			}

			if !yield(result, nil) {
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
