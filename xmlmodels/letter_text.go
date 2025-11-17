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

type PageRender struct {
	Index        string
	StartsInline bool
	Tokens       Tokens
	rendered     string
}

func (p *PageRender) HTML() string {
	if p == nil {
		return ""
	}
	if p.rendered != "" {
		return p.rendered
	}
	p.rendered = p.Tokens.String()
	return p.rendered
}

type LenzParseState struct {
	Tokens       Tokens
	Notes        []Note
	Count        []Note
	Pages        []*PageRender
	currentPage  *PageRender
	paging       bool
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
	builder.WriteString(s.CountHTML())
	builder.WriteString(outToken{Name: "div", Classes: []string{"count"}, Type: EndElement}.String())

	tokens := s.Tokens
	tokens.Prepend(outToken{Name: "div", Classes: []string{"fulltext"}, Type: Element})
	tokens.AppendEndElement()
	builder.WriteString(tokens.String())

	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: Element}.String())
	builder.WriteString(s.NotesHTML())
	builder.WriteString(outToken{Name: "div", Classes: []string{"notes"}, Type: EndElement}.String())
	s.rendered = builder.String()
	return s.rendered
}

func (s *LenzParseState) CountHTML() string {
	if s == nil {
		return ""
	}
	builder := strings.Builder{}
	for _, c := range s.Count {
		builder.WriteString(c.Tokens.String())
	}
	return builder.String()
}

func (s *LenzParseState) NotesHTML() string {
	if s == nil {
		return ""
	}
	builder := strings.Builder{}
	for _, note := range s.Notes {
		builder.WriteString(note.Tokens.String())
	}
	return builder.String()
}

func (s *LenzParseState) AppendNote(note Note) {
	s.Notes = append(s.Notes, note)
}

func (s *LenzParseState) ensureCurrentPage() *PageRender {
	if s.currentPage == nil {
		s.startPage(s.PC)
	}
	return s.currentPage
}

func (s *LenzParseState) startPage(index string) *PageRender {
	if index == "" {
		index = strconv.Itoa(len(s.Pages) + 1)
	}
	page := &PageRender{Index: index}
	s.Pages = append(s.Pages, page)
	s.currentPage = page
	s.paging = true
	return page
}

func (s *LenzParseState) currentPageTokens() *Tokens {
	if !s.paging {
		return nil
	}
	return &s.ensureCurrentPage().Tokens
}

func (s *LenzParseState) appendDefaultElement(token *xmlparsing.Token, ids ...string) {
	s.Tokens.AppendDefaultElement(token, ids...)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendDefaultElement(token, ids...)
	}
}

func (s *LenzParseState) appendDivElement(id string, classes ...string) {
	s.Tokens.AppendDivElement(id, classes...)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendDivElement(id, classes...)
	}
}

func (s *LenzParseState) appendEndElement() {
	s.Tokens.AppendEndElement()
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendEndElement()
	}
}

func (s *LenzParseState) appendCustomAttribute(name, value string) {
	s.Tokens.AppendCustomAttribute(name, value)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendCustomAttribute(name, value)
	}
}

func (s *LenzParseState) appendLink(href string, classes ...string) {
	s.Tokens.AppendLink(href, classes...)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendLink(href, classes...)
	}
}

func (s *LenzParseState) appendEmptyElement(name string, id string, classes ...string) {
	s.Tokens.AppendEmptyElement(name, id, classes...)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendEmptyElement(name, id, classes...)
	}
}

func (s *LenzParseState) appendText(text string) {
	s.Tokens.AppendText(text)
	if pageTokens := s.currentPageTokens(); pageTokens != nil {
		pageTokens.AppendText(text)
	}
}

func (s *LenzParseState) markCurrentPageInline(inline bool) {
	if page := s.ensureCurrentPage(); page != nil {
		page.StartsInline = inline
	}
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
		ps.appendDefaultElement(elem)
		ps.appendDivElement("", "insertion-marker")
		ps.appendEndElement()
	case "sidenote":
		id := randString(8)
		ps.appendDefaultElement(elem)
		ps.Break = false
		ps.appendCustomAttribute("aria-describedby", id)
		if elem.Attributes["annotation"] != "" ||
			elem.Attributes["page"] != "" ||
			elem.Attributes["pos"] != "" {
			note := Note{Id: id}
			note.Tokens.AppendDivElement(id, "note-sidenote-meta")
			ps.appendDivElement(id, "inline-sidenote-meta")
			if elem.Attributes["page"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-page")
				note.Tokens.AppendText(elem.Attributes["page"])
				note.Tokens.AppendEndElement()
				ps.appendDivElement("", "sidenote-page")
				ps.appendText(elem.Attributes["page"])
				ps.appendEndElement()
			}
			if elem.Attributes["annotation"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-note")
				note.Tokens.AppendText(elem.Attributes["annotation"])
				note.Tokens.AppendEndElement()
				ps.appendDivElement("", "sidenote-note")
				ps.appendText(elem.Attributes["annotation"])
				ps.appendEndElement()
			}
			if elem.Attributes["pos"] != "" {
				note.Tokens.AppendDivElement("", "sidenote-pos")
				note.Tokens.AppendText(elem.Attributes["pos"])
				note.Tokens.AppendEndElement()
				ps.appendDivElement("", "sidenote-pos")
				ps.appendText(elem.Attributes["pos"])
				ps.appendEndElement()
			}
			note.Tokens.AppendEndElement()
			ps.appendEndElement()
			ps.AppendNote(note)
		}

	case "note":
		id := randString(8)
		ps.appendLink("#"+id, "nanchor-note")
		ps.appendEndElement()
		ps.appendDivElement(id, "note", "note-note")

	case "nr":
		ext := elem.Attributes["extent"]
		if ext == "" {
			ext = "1"
		}
		extno, err := strconv.Atoi(ext)
		if err != nil {
			extno = 1
		}

		ps.appendDefaultElement(elem)
		for i := 0; i < extno; i++ {
			ps.appendText("&nbsp;")
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
		ps.appendDivElement(id, "inline-hand")
		ps.appendText(hand)
		ps.appendEndElement()
		ps.appendDivElement("", "hand")
		ps.appendCustomAttribute("aria-describedby", id)

	case "line":
		if val := elem.Attributes["type"]; val != "empty" {
			ps.LC += 1
			if ps.Break {
				ps.appendEmptyElement("br", ps.PC+"-"+strconv.Itoa(ps.LC))
			}
			ps.appendDefaultElement(elem)
		} else {
			ps.appendEmptyElement("br", "", "empty")
			ps.CloseElement = false
		}
		ps.LineBreak = true

	case "page":
		ps.PC = elem.Attributes["index"]
		ps.PageBreak = true
		ps.CloseElement = false
		ps.startPage(ps.PC)

	default:
		ps.appendDefaultElement(elem)
	}

	return nil
}

func (h LenzTextHandler) OnCloseElement(state *xmlparsing.ParseState[*LenzParseState], elem *xmlparsing.Token) error {
	ps := state.Data()
	if elem.Name == "sidenote" {
		ps.LineBreak = true
	}
	if ps.CloseElement {
		ps.appendEndElement()
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
		inline := !ps.LineBreak
		ps.markCurrentPageInline(inline)
		note := Note{Id: ps.PC}
		quality := "outside"
		if inline {
			quality = "inside"
		}
		ps.appendDivElement("", "eanchor-page", "eanchor-page-"+quality)
		ps.appendCustomAttribute("aria-describedby", ps.PC)
		ps.appendEndElement()
		ps.appendDivElement("", "page-counter", "page-"+quality)
		ps.appendText(ps.PC)
		ps.appendEndElement()
		note.Tokens.AppendDivElement(ps.PC, "page", "page-"+quality)
		note.Tokens.AppendText(ps.PC)
		note.Tokens.AppendEndElement()
		ps.Count = append(ps.Count, note)
	}
	if ps.LineBreak {
		ps.LineBreak = false
	}

	ps.appendDefaultElement(elem)
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
