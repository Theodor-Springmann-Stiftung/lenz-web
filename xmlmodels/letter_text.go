package xmlmodels

import (
	"math/rand"
	"strconv"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlparsing"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func randString(length int) string {
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
	Lib          *Library
	rendered     string
}

func (s *LenzParseState) String() string {
	if s == nil {
		return ""
	}
	if s.rendered != "" {
		return s.rendered
	}
	builder := strings.Builder{}
	builder.WriteString(outToken{Name: "div", Classes: []string{"count"}, Type: Element}.String())
	for _, c := range s.Count {
		builder.WriteString(c.Tokens.String())
	}
	builder.WriteString(outToken{Name: "div", Classes: []string{"count"}, Type: EndElement}.String())

	tokens := s.Tokens
	tokens.Prepend(outToken{Name: "div", Classes: []string{"fulltext"}, Type: Element})
	tokens.AppendEndElement()
	builder.WriteString(tokens.String())

	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: Element}.String())
	for _, note := range s.Notes {
		builder.WriteString(note.Tokens.String())
	}
	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: EndElement}.String())
	s.rendered = builder.String()
	return s.rendered
}

func (s *LenzParseState) AppendNote(note Note) {
	s.Notes = append(s.Notes, note)
}

type LenzTextHandler struct {
	Lib *Library
}

func (h LenzTextHandler) NewState() *LenzParseState {
	return &LenzParseState{
		CloseElement: true,
		PC:           "1",
		Lib:          h.Lib,
	}
}

func (h LenzTextHandler) OnOpenElement(state *xmlparsing.ParseState[*LenzParseState], elem *xmlparsing.Token) error {
	ps := state.Data()

	switch elem.Name {
	case "insertion":
		ps.Tokens.AppendDefaultElement(elem)
		ps.Tokens.AppendDivElement("", "insertion-marker")
		ps.Tokens.AppendEndElement()
	case "sidenote":
		id := randString(8)
		ps.Tokens.AppendDefaultElement(elem)
		ps.Break = false
		ps.Tokens.AppendCustomAttribute("aria-describedby", id)
		if elem.Attributes["annotation"] != "" ||
			elem.Attributes["page"] != "" ||
			elem.Attributes["pos"] != "" {
			note := Note{Id: id}
			note.Tokens.AppendDivElement(id, "note-sidenote-meta")
			ps.Tokens.AppendDivElement(id, "inline-sidenote-meta")
			if elem.Attributes["page"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-page")
				note.Tokens.AppendText(elem.Attributes["page"])
				note.Tokens.AppendEndElement()
				ps.Tokens.AppendDivElement("", "sidenote-page")
				ps.Tokens.AppendText(elem.Attributes["page"])
				ps.Tokens.AppendEndElement()
			}
			if elem.Attributes["annotation"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-note")
				note.Tokens.AppendText(elem.Attributes["annotation"])
				note.Tokens.AppendEndElement()
				ps.Tokens.AppendDivElement("", "sidenote-note")
				ps.Tokens.AppendText(elem.Attributes["annotation"])
				ps.Tokens.AppendEndElement()
			}
			if elem.Attributes["pos"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-pos")
				note.Tokens.AppendText(elem.Attributes["pos"])
				note.Tokens.AppendEndElement()
				ps.Tokens.AppendDivElement("", "sidenote-pos")
				ps.Tokens.AppendText(elem.Attributes["pos"])
				ps.Tokens.AppendEndElement()
			}
			note.Tokens.AppendEndElement()
			ps.Tokens.AppendEndElement()
			ps.AppendNote(note)
		}

	case "note":
		id := randString(8)
		ps.Tokens.AppendLink("#"+id, "nanchor-note")
		ps.Tokens.AppendEndElement()
		ps.Tokens.AppendDivElement(id, "note", "note-note")

	case "nr":
		ext := elem.Attributes["extent"]
		if ext == "" {
			ext = "1"
		}
		extno, err := strconv.Atoi(ext)
		if err != nil {
			extno = 1
		}

		ps.Tokens.AppendDefaultElement(elem)
		for i := 0; i < extno; i++ {
			ps.Tokens.AppendText("&nbsp;")
		}

	case "hand":
		id := randString(8)
		idno, err := strconv.Atoi(elem.Attributes["ref"])
		var person *PersonDef
		if err == nil && ps.Lib != nil {
			person = ps.Lib.Persons.Item(idno)
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
		if val := elem.Attributes["type"]; val != "empty" {
			ps.LC += 1
			if ps.Break {
				ps.Tokens.AppendEmptyElement("br", ps.PC+"-"+strconv.Itoa(ps.LC))
			}
			ps.Tokens.AppendDefaultElement(elem)
		} else {
			ps.Tokens.AppendEmptyElement("br", "", "empty")
			ps.CloseElement = false
		}
		ps.LineBreak = true

	case "page":
		ps.PC = elem.Attributes["index"]
		ps.PageBreak = true
		ps.CloseElement = false

	default:
		ps.Tokens.AppendDefaultElement(elem)
	}

	return nil
}

func (h LenzTextHandler) OnCloseElement(state *xmlparsing.ParseState[*LenzParseState], elem *xmlparsing.Token) error {
	ps := state.Data()
	if elem.Name == "sidenote" {
		ps.LineBreak = true
	}
	if ps.CloseElement {
		ps.Tokens.AppendEndElement()
	} else {
		ps.CloseElement = true
	}
	return nil
}

func (h LenzTextHandler) OnText(state *xmlparsing.ParseState[*LenzParseState], elem *xmlparsing.Token) error {
	ps := state.Data()
	trimmed := strings.TrimSpace(elem.Data)
	if trimmed == "" {
		return nil
	}

	if !ps.Break {
		ps.Break = true
	}
	if ps.PageBreak && ps.PC != "1" {
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
	}
	if ps.LineBreak {
		ps.LineBreak = false
	}

	ps.Tokens.AppendDefaultElement(elem)
	return nil
}

func (h LenzTextHandler) OnComment(*xmlparsing.ParseState[*LenzParseState], *xmlparsing.Token) error {
	return nil
}

func (h LenzTextHandler) Result(state *xmlparsing.ParseState[*LenzParseState]) (string, error) {
	return state.Data().String(), nil
}

func parseText(lib *Library, raw string) (xmlparsing.Parsed[LenzTextHandler, *LenzParseState], error) {
	handler := LenzTextHandler{Lib: lib}
	parsed := xmlparsing.NewParsed[LenzTextHandler, *LenzParseState](handler)
	return parsed, parsed.ParseString(raw)
}

// TemplateParse exposes the legacy helper for go templates (e.g. traditions).
func TemplateParse(lib *Library) func(letter *Meta, s string) string {
	return func(_ *Meta, s string) string {
		parsed, err := parseText(lib, s)
		if err != nil {
			return err.Error()
		}
		return parsed.Data().String()
	}
}
