package functions

import (
	"strings"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
)

type outType int

const (
	NA outType = iota
	Text
	Element
	EmptyElement
	EndElement
)

type outToken struct {
	Type       outType
	Name       string
	Classes    []string
	Id         string
	Value      string
	Attributes map[string]string
}

func (o outToken) String() string {
	switch o.Type {
	case Text:
		return o.Value

	case Element:
		builder := strings.Builder{}
		builder.WriteString("<")
		builder.WriteString(o.Name)
		if len(o.Classes) > 0 {
			builder.WriteString(" class=\"")
			builder.WriteString(strings.Join(o.Classes, " "))
			builder.WriteString("\"")
		}
		if len(o.Id) > 0 {
			builder.WriteString(" id=\"")
			builder.WriteString(o.Id)
			builder.WriteString("\"")
		}
		if len(o.Attributes) > 0 {
			for key, value := range o.Attributes {
				builder.WriteString(" ")
				builder.WriteString(key)
				builder.WriteString("=\"")
				builder.WriteString(value)
				builder.WriteString("\"")
			}
		}
		builder.WriteString(">")
		return builder.String()

	case EndElement:
		return "</" + o.Name + ">"

	case EmptyElement:
		builder := strings.Builder{}
		builder.WriteString("<")
		builder.WriteString(o.Name)
		if len(o.Classes) > 0 {
			builder.WriteString(" class=\"")
			builder.WriteString(strings.Join(o.Classes, " "))
			builder.WriteString("\"")
		}

		if len(o.Id) > 0 {
			builder.WriteString(" id=\"")
			builder.WriteString(o.Id)
			builder.WriteString("\"")
		}

		if len(o.Attributes) > 0 {
			for key, value := range o.Attributes {
				builder.WriteString(" ")
				builder.WriteString(key)
				builder.WriteString("=\"")
				builder.WriteString(value)
				builder.WriteString("\"")
			}
		}

		builder.WriteString("/>")
		return builder.String()
	}

	return ""
}

func (o *outToken) ClassesFromAttrs(attrs map[string]string) {
	if len(attrs) == 0 {
		return
	}
	for key, value := range attrs {
		o.Classes = append(o.Classes, key+"-"+value)
	}
}

func Default(token xmlparsing.Token) outToken {
	o := outToken{}
	switch token.Type {
	case xmlparsing.StartElement:
		o.Name = "div"
		o.Type = Element
		o.Classes = []string{token.Name}
		o.ClassesFromAttrs(token.Attributes)
	case xmlparsing.EndElement:
		o.Type = EndElement
	case xmlparsing.CharData:
		o.Type = Text
		o.Value = token.Data
	}
	return o
}

type Tokens struct {
	Out []outToken
}

func (s *Tokens) AppendDefaultElement(token xmlparsing.Token, ids ...string) {
	t := Default(token)
	if len(ids) > 0 {
		t.Id = ids[0]
	}

	s.Out = append(s.Out, t)
}

func (s *Tokens) AppendEndElement() {
	skip := 0
	for i := len(s.Out) - 1; i >= 0; i-- {
		if s.Out[i].Type == EndElement {
			skip++
		}
		if s.Out[i].Type == Element {
			if skip == 0 {
				s.Out = append(s.Out, outToken{
					Name: s.Out[i].Name,
					Type: EndElement,
				})
				return
			} else {
				skip--
			}
		}
	}
}

func (s *Tokens) AppendDivElement(id string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:    "div",
		Id:      id,
		Classes: classes,
		Type:    Element,
	})
}

func (s *Tokens) AppendEmptyElement(name string, id string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:    name,
		Id:      id,
		Classes: classes,
		Type:    EmptyElement,
	})
}

func (s *Tokens) AppendLink(href string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:       "a",
		Attributes: map[string]string{"href": href},
		Classes:    classes,
		Type:       Element,
	})
}

func (s *Tokens) AppendText(text string) {
	s.Out = append(s.Out, outToken{
		Type:  Text,
		Value: text,
	})
}

func (s *Tokens) Append(token outToken) {
	s.Out = append(s.Out, token)
}

func (s *Tokens) String() string {
	builder := strings.Builder{}
	for _, token := range s.Out {
		builder.WriteString(token.String())
	}
	return builder.String()
}
