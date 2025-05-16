package functions

import (
	"math/rand"
	"strconv"
	"strings"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func RandString(length int) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

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
		builder.WriteString("/>")
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

type LenzParseState struct {
	Out          []outToken
	LC           int
	PC           string
	CloseElement bool
}

func (s *LenzParseState) String() string {
	builder := strings.Builder{}
	for _, token := range s.Out {
		builder.WriteString(token.String())
	}
	return builder.String()
}

func (s *LenzParseState) AppendDefaultElement(token xmlparsing.Token, ids ...string) {
	t := Default(token)
	if len(ids) > 0 {
		t.Id = ids[0]
	}

	s.Out = append(s.Out, t)
}

func (s *LenzParseState) AppendEndElement() {
	for i := len(s.Out) - 1; i >= 0; i-- {
		if s.Out[i].Type == Element {
			s.Out = append(s.Out, outToken{
				Name: s.Out[i].Name,
				Type: EndElement,
			})
			return
		}
	}
}

func (s *LenzParseState) AppendDivElement(id string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:    "div",
		Id:      id,
		Classes: classes,
	})
}

func (s *LenzParseState) AppendEmptyElement(name string, id string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:    name,
		Id:      id,
		Classes: classes,
		Type:    EmptyElement,
	})
}

func (s *LenzParseState) AppendLink(href string, classes ...string) {
	s.Out = append(s.Out, outToken{
		Name:       "a",
		Attributes: map[string]string{"href": href},
		Classes:    classes,
		Type:       Element,
	})
}

func (s *LenzParseState) AppendText(text string) {
	s.Out = append(s.Out, outToken{
		Type:  Text,
		Value: text,
	})
}

func (s *LenzParseState) Append(token outToken) {
	s.Out = append(s.Out, token)
}

func Parse(lib *xmlmodels.Library) func(s string) string {
	return func(s string) string {
		if len(s) == 0 {
			return ""
		}

		ps := LenzParseState{CloseElement: true}

		for elem, err := range xmlparsing.Iterate(s, ps) {
			if err != nil {
				return err.Error()
			}

			if elem.Token.Type < 3 {
				if elem.Token.Type == xmlparsing.EndElement {
					if ps.CloseElement {
						ps.AppendEndElement()
					} else {
						ps.CloseElement = true
					}
					continue
				}

				switch elem.Token.Name {

				case "sidenote":
					id := RandString(8)
					if elem.Token.Attributes["annotation"] != "" ||
						elem.Token.Attributes["page"] != "" ||
						elem.Token.Attributes["pos"] != "" {
						ps.AppendLink("#"+id, "nanchor-sidenote")
						ps.AppendEndElement()
						ps.AppendDivElement(id, "note-sidenote-meta")
						if elem.Token.Attributes["annotation"] != "" {
							ps.AppendDivElement("", "sidenote-note")
							ps.AppendText(elem.Token.Attributes["annotation"])
							ps.AppendEndElement()
						}
						if elem.Token.Attributes["page"] != "" {
							ps.AppendDivElement("", "sidenote-page")
							ps.AppendText(elem.Token.Attributes["page"])
							ps.AppendEndElement()
						}
						if elem.Token.Attributes["pos"] != "" {
							ps.AppendDivElement("", "sidenote-pos")
							ps.AppendText(elem.Token.Attributes["pos"])
							ps.AppendEndElement()
						}
						ps.AppendEndElement() // sidenote-meta
					}
					ps.AppendDefaultElement(elem.Token, id)

				case "note":
					id := RandString(8)
					ps.AppendLink("#"+id, "nanchor-note")
					ps.AppendEndElement()
					ps.AppendDivElement(id, "note", "note-note")

				case "hand":
					id := elem.Token.Attributes["ref"]
					idno, err := strconv.Atoi(id)
					var person *xmlmodels.PersonDef
					if err == nil {
						person = lib.Persons.Item(idno)
					}
					ps.AppendLink("#"+id, "nanchor-hand")
					ps.AppendEndElement()
					ps.AppendDivElement(id, "note-hand")
					hand := "N/A"
					if person != nil {
						hand = person.Name
					}
					ps.AppendText(hand)
					ps.AppendEndElement()
					ps.AppendDefaultElement(elem.Token)

				case "line":
					if val := elem.Token.Attributes["type"]; val != "empty" {
						ps.LC += 1
						ps.AppendEmptyElement("br", ps.PC+"-"+strconv.Itoa(ps.LC))
						ps.AppendDefaultElement(elem.Token) // This is for indents, must be closed
					} else {
						ps.AppendEmptyElement("br", "", "empty")
						ps.CloseElement = false // Here Indents make no sense, so we dont open an element
					}

				case "page":
					ps.PC = elem.Token.Attributes["index"]
					ps.AppendLink("#"+ps.PC, "eanchor-page")
					ps.AppendEndElement()
					ps.AppendDivElement(ps.PC, "page")
					ps.AppendText(ps.PC)

				default:
					ps.AppendDefaultElement(elem.Token)
				}
			}
		}

		return ps.String()
	}
}
