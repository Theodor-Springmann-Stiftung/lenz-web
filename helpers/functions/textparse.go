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

type Note struct {
	Id     string
	Tokens Tokens
}

type LenzParseState struct {
	Tokens       Tokens
	Notes        []Note
	Count        []Note
	LC           int
	PC           string
	CloseElement bool
	Break        bool
	PageBreak    bool
	LineBreak    bool
}

func (s *LenzParseState) String() string {
	builder := strings.Builder{}
	builder.WriteString(outToken{Name: "div", Classes: []string{"count"}, Type: Element}.String())
	for _, c := range s.Count {
		builder.WriteString(c.Tokens.String())
	}
	builder.WriteString(outToken{Name: "div", Classes: []string{"count"}, Type: EndElement}.String())
	s.Tokens.Prepend(outToken{Name: "div", Classes: []string{"fulltext"}, Type: Element})
	s.Tokens.AppendEndElement()
	builder.WriteString(s.Tokens.String())
	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: Element}.String())
	for _, note := range s.Notes {
		builder.WriteString(note.Tokens.String())
	}
	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: EndElement}.String())
	return builder.String()
}

func (s *LenzParseState) AppendNote(note Note) {
	s.Notes = append(s.Notes, note)
}

func Parse(lib *xmlmodels.Library) func(s string) string {
	return func(s string) string {
		if len(s) == 0 {
			return ""
		}

		ps := LenzParseState{CloseElement: true, PC: "1"}

		for elem, err := range xmlparsing.Iterate(s, ps) {
			if err != nil {
				return err.Error()
			}

			if elem.Token.Type < 3 {
				if elem.Token.Type == xmlparsing.EndElement {
					if elem.Token.Name == "sidenote" {
						ps.LineBreak = true
					}
					if ps.CloseElement {
						ps.Tokens.AppendEndElement()
					} else {
						ps.CloseElement = true
					}
					continue
				}

				switch elem.Token.Name {

				case "sidenote":
					id := RandString(8)
					ps.Tokens.AppendDefaultElement(elem.Token)
					ps.Break = false
					ps.Tokens.AppendCustomAttribute("aria-describedby", id)
					if elem.Token.Attributes["annotation"] != "" ||
						elem.Token.Attributes["page"] != "" ||
						elem.Token.Attributes["pos"] != "" {
						note := Note{Id: id}
						note.Tokens.AppendDivElement(id, "note-sidenote-meta")
						ps.Tokens.AppendDivElement(id, "inline-sidenote-meta")
						if elem.Token.Attributes["page"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-page")
							note.Tokens.AppendText(elem.Token.Attributes["page"])
							note.Tokens.AppendEndElement()
							ps.Tokens.AppendDivElement("", "sidenote-page")
							ps.Tokens.AppendText(elem.Token.Attributes["page"])
							ps.Tokens.AppendEndElement()
						}
						if elem.Token.Attributes["annotation"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-note")
							note.Tokens.AppendText(elem.Token.Attributes["annotation"])
							note.Tokens.AppendEndElement()
							ps.Tokens.AppendDivElement("", "sidenote-note")
							ps.Tokens.AppendText(elem.Token.Attributes["annotation"])
							ps.Tokens.AppendEndElement()
						}
						if elem.Token.Attributes["pos"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-pos")
							note.Tokens.AppendText(elem.Token.Attributes["pos"])
							note.Tokens.AppendEndElement()
							ps.Tokens.AppendDivElement("", "sidenote-pos")
							ps.Tokens.AppendText(elem.Token.Attributes["pos"])
							ps.Tokens.AppendEndElement()
						}
						note.Tokens.AppendEndElement() // sidenote-meta
						ps.Tokens.AppendEndElement()
						ps.AppendNote(note)
					}

				case "note":
					id := RandString(8)
					ps.Tokens.AppendLink("#"+id, "nanchor-note")
					ps.Tokens.AppendEndElement()
					ps.Tokens.AppendDivElement(id, "note", "note-note")

				case "hand":
					id := elem.Token.Attributes["ref"]
					idno, err := strconv.Atoi(id)
					var person *xmlmodels.PersonDef
					if err == nil {
						person = lib.Persons.Item(idno)
					}
					hand := "N/A"
					if person != nil {
						hand = person.Name
					}

					note := Note{Id: id}
					note.Tokens.AppendDivElement(id, "note-hand")
					note.Tokens.AppendText(hand)
					note.Tokens.AppendEndElement()
					ps.AppendNote(note)
					ps.Tokens.AppendDivElement(id, "inline-hand")
					ps.Tokens.AppendText(hand)
					ps.Tokens.AppendEndElement()
					ps.Tokens.AppendDivElement("", "hand")
					ps.Tokens.AppendCustomAttribute("aria-describedby", id)

				case "line":
					if val := elem.Token.Attributes["type"]; val != "empty" {
						ps.LC += 1
						if ps.Break {
							ps.Tokens.AppendEmptyElement("br", ps.PC+"-"+strconv.Itoa(ps.LC))
						}
						ps.Tokens.AppendDefaultElement(elem.Token) // This is for indents, must be closed
					} else {
						ps.Tokens.AppendEmptyElement("br", "", "empty")
						ps.CloseElement = false // Here Indents make no sense, so we dont open an element
					}
					ps.LineBreak = true

				case "page":
					ps.PC = elem.Token.Attributes["index"]
					ps.PageBreak = true
					ps.CloseElement = false

				default:
					if !ps.Break && elem.Token.Type == xmlparsing.CharData && strings.TrimSpace(elem.Token.Data) != "" {
						ps.Break = true
					}
					if ps.PageBreak && ps.PC != "1" && elem.Token.Type == xmlparsing.CharData && strings.TrimSpace(elem.Token.Data) != "" {
						ps.PageBreak = false
						note := Note{Id: ps.PC}
						quality := "outside"
						if !ps.LineBreak {
							quality = "inside"
						}
						ps.Tokens.AppendDivElement("", "eanchor-page", "eanchor-page-"+quality)
						ps.Tokens.AppendCustomAttribute("aria-describedby", ps.PC)
						ps.Tokens.AppendEndElement()
						ps.Tokens.AppendDivElement("", "page-counter", "page-"+quality)
						ps.Tokens.AppendText(ps.PC)
						ps.Tokens.AppendEndElement()
						note.Tokens.AppendDivElement(ps.PC, "page", "page-"+quality)
						note.Tokens.AppendText(ps.PC)
						note.Tokens.AppendEndElement()
						ps.Count = append(ps.Count, note)
						strings.TrimLeft(elem.Token.Data, " \t\n\r")
					}
					if ps.LineBreak && elem.Token.Type == xmlparsing.CharData && strings.TrimSpace(elem.Token.Data) != "" {
						strings.TrimLeft(elem.Token.Data, " \t\n\r")
						ps.LineBreak = false
					}
					ps.Tokens.AppendDefaultElement(elem.Token)
				}
			}
		}

		return ps.String()
	}
}
