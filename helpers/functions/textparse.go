package functions

import (
	"strconv"
	"strings"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
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
	Type    outType
	Name    string
	Classes []string
	Id      string
	Value   string
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
		switch token.Type {
		case Text:
			builder.WriteString(token.Value)
		case Element:
			builder.WriteString("<")
			builder.WriteString(token.Name)
			if len(token.Classes) > 0 {
				builder.WriteString(" class=\"")
				builder.WriteString(strings.Join(token.Classes, " "))
				builder.WriteString("\"")
			}
			if len(token.Id) > 0 {
				builder.WriteString(" id=\"")
				builder.WriteString(token.Id)
				builder.WriteString("\"")
			}
			builder.WriteString(">")
		case EndElement:
			builder.WriteString("</div>")
		case EmptyElement:
			builder.WriteString("<")
			builder.WriteString(token.Name)
			if len(token.Classes) > 0 {
				builder.WriteString(" class=\"")
				builder.WriteString(strings.Join(token.Classes, " "))
				builder.WriteString("\"")
			}

			if len(token.Id) > 0 {
				builder.WriteString(" id=\"")
				builder.WriteString(token.Id)
				builder.WriteString("\"")
			}
			builder.WriteString("/>")
		}
	}
	return builder.String()
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
				if !ps.CloseElement && elem.Token.Type == xmlparsing.EndElement {
					ps.CloseElement = true
					continue
				} else if elem.Token.Type == xmlparsing.EndElement {
					ps.Out = append(ps.Out, Default(elem.Token))
					continue
				}

				defaultToken := Default(elem.Token)
				switch elem.Token.Name {
				case "sidenote":
					nt := outToken{
						Type:    Element,
						Name:    "div",
						Classes: []string{"sidenote"},
					}
					ps.Out = append(ps.Out, nt)
					if elem.Token.Attributes["annotation"] != "" {
						note := outToken{
							Type:    Element,
							Name:    "div",
							Classes: []string{"sidenote-note"},
						}
						notecontent := outToken{
							Type:  Text,
							Value: elem.Token.Attributes["annotation"],
						}
						noteend := outToken{
							Type: EndElement,
							Name: "div",
						}
						ps.Out = append(ps.Out, note, notecontent, noteend)
					}
					if elem.Token.Attributes["page"] != "" {
						note := outToken{
							Type:    Element,
							Name:    "div",
							Classes: []string{"sidenote-page"},
						}
						notecontent := outToken{
							Type:  Text,
							Value: elem.Token.Attributes["page"],
						}
						noteend := outToken{
							Type: EndElement,
							Name: "div",
						}
						ps.Out = append(ps.Out, note, notecontent, noteend)
					}
					if elem.Token.Attributes["pos"] != "" {
						note := outToken{
							Type:    Element,
							Name:    "div",
							Classes: []string{"sidenote-pos"},
						}
						notecontent := outToken{
							Type:  Text,
							Value: elem.Token.Attributes["pos"],
						}
						noteend := outToken{
							Type: EndElement,
							Name: "div",
						}
						ps.Out = append(ps.Out, note, notecontent, noteend)
					}
				case "hand":
					nt := outToken{
						Type:    Element,
						Name:    "div",
						Classes: []string{"hand"},
					}
					ps.Out = append(ps.Out, nt)
					id := elem.Token.Attributes["ref"]
					idno, err := strconv.Atoi(id)
					var person *xmlmodels.PersonDef
					if err == nil {
						person = lib.Persons.Item(idno)
					}
					handtok := outToken{
						Type:    Element,
						Name:    "div",
						Classes: []string{"hand-person"},
					}
					defhand := outToken{
						Type:  Text,
						Value: "N/A",
					}
					if person != nil {
						defhand.Value = person.Name
					}
					handend := outToken{
						Type: EndElement,
						Name: "div",
					}
					ps.Out = append(ps.Out, handtok, defhand, handend)
				case "line":
					nt := outToken{
						Type: EmptyElement,
						Name: "br",
					}
					if val := elem.Token.Attributes["type"]; val != "empty" {
						ps.Out = append(ps.Out, nt)
						ps.LC += 1
						ps.Out = append(ps.Out, defaultToken)
					} else {
						nt.Classes = []string{"empty"}
						ps.Out = append(ps.Out, nt)
						ps.CloseElement = false
					}
				case "page":
					ps.LC = 0
					ps.PC = elem.Token.Attributes["index"]
					ps.Out = append(ps.Out, defaultToken)
					nt := outToken{
						Type:  Text,
						Value: "[" + ps.PC + "]",
					}
					ps.Out = append(ps.Out, nt)
				default:
					ps.Out = append(ps.Out, defaultToken)
				}
			}
		}

		return ps.String()
	}
}
