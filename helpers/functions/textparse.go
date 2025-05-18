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
	LC           int
	PC           string
	CloseElement bool
	PageBreak    bool
}

func (s *LenzParseState) String() string {
	builder := strings.Builder{}
	builder.WriteString(s.Tokens.String())
	for _, note := range s.Notes {
		builder.WriteString(note.Tokens.String())
	}
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

		ps := LenzParseState{CloseElement: true}

		for elem, err := range xmlparsing.Iterate(s, ps) {
			if err != nil {
				return err.Error()
			}

			if elem.Token.Type < 3 {
				if elem.Token.Type == xmlparsing.EndElement {
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
					ps.Tokens.AppendDefaultElement(elem.Token, id)
					if elem.Token.Attributes["annotation"] != "" ||
						elem.Token.Attributes["page"] != "" ||
						elem.Token.Attributes["pos"] != "" {
						ps.Tokens.AppendLink("#"+id, "nanchor-sidenote")
						ps.Tokens.AppendEndElement()
						note := Note{Id: id}
						note.Tokens.AppendDivElement(id, "note-sidenote-meta")
						if elem.Token.Attributes["annotation"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-note")
							note.Tokens.AppendText(elem.Token.Attributes["annotation"])
							note.Tokens.AppendEndElement()
						}
						if elem.Token.Attributes["page"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-page")
							note.Tokens.AppendText(elem.Token.Attributes["page"])
							note.Tokens.AppendEndElement()
						}
						if elem.Token.Attributes["pos"] != "" {
							note.Tokens.AppendDivElement("", "sidenote-pos")
							note.Tokens.AppendText(elem.Token.Attributes["pos"])
							note.Tokens.AppendEndElement()
						}
						note.Tokens.AppendEndElement() // sidenote-meta
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
					ps.Tokens.AppendLink("#"+id, "nanchor-hand")
					ps.Tokens.AppendEndElement()
					note := Note{Id: id}
					note.Tokens.AppendDivElement(id, "note-hand")
					hand := "N/A"
					if person != nil {
						hand = person.Name
					}
					note.Tokens.AppendText(hand)
					note.Tokens.AppendEndElement()
					ps.AppendNote(note)
					ps.Tokens.AppendDefaultElement(elem.Token)

				case "line":
					if val := elem.Token.Attributes["type"]; val != "empty" {
						ps.LC += 1
						ps.Tokens.AppendEmptyElement("br", ps.PC+"-"+strconv.Itoa(ps.LC))
						ps.Tokens.AppendDefaultElement(elem.Token) // This is for indents, must be closed
					} else {
						ps.Tokens.AppendEmptyElement("br", "", "empty")
						ps.CloseElement = false // Here Indents make no sense, so we dont open an element
					}

				case "page":
					ps.PC = elem.Token.Attributes["index"]
					ps.Tokens.AppendLink("#"+ps.PC, "eanchor-page")
					ps.Tokens.AppendEndElement()
					ps.Tokens.AppendDivElement(ps.PC, "page")
					ps.Tokens.AppendText(ps.PC)

				default:
					ps.Tokens.AppendDefaultElement(elem.Token)
				}
			}
		}

		return ps.String()
	}
}
