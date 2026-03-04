package server

import (
	"bytes"
	"html"
	"html/template"
	"net/http"
	"slices"
	"strconv"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/app"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/labstack/echo/v5"
)

type briefPageModel struct {
	Number  int
	Prev    int
	Next    int
	Heading letterHeadModel
	Pages   []briefRenderPage
}

type briefRenderPage struct {
	Number      int
	Lines       []briefRenderLine
	LeftNotes   []briefRenderSidenote
	RightNotes  []briefRenderSidenote
	TopNotes    []briefRenderSidenote
	BottomNotes []briefRenderSidenote
}

type briefRenderSidenote struct {
	Position   string
	PosClass   string
	Annotation string
	Lines      []briefRenderLine
}

type briefRenderLine struct {
	Type      string
	AlignCtx  bool
	TabCtx    bool
	ClassName string
	Text      string
	HTML      template.HTML
}

func (s *Server) Brief(c *echo.Context) error {
	num, err := strconv.Atoi(c.Param("number"))
	if err != nil || num <= 0 {
		return c.String(http.StatusBadRequest, "invalid brief number")
	}

	letter := s.app.Library().Letters.Item(num)
	if letter == nil {
		return c.String(http.StatusNotFound, "brief not found")
	}

	meta := s.app.Library().Metas.Item(num)
	model := renderBrief(*letter)
	model.Heading = buildLetterHead(s.app.Library(), meta)
	model.Prev, model.Next = briefNeighbors(s.app, num)
	var out bytes.Buffer
	if err := s.tmpl.ExecuteTemplate(&out, "brief", model); err != nil {
		return c.String(http.StatusInternalServerError, "template render failed: "+err.Error())
	}
	return c.HTML(http.StatusOK, out.String())
}

func briefNeighbors(a *app.App, current int) (prev int, next int) {
	lib := a.Library()
	nums := make([]int, 0, lib.Letters.Count())
	for letter := range lib.Letters.Iterate() {
		nums = append(nums, letter.Letter)
	}
	if len(nums) == 0 {
		return 0, 0
	}
	slices.Sort(nums)
	i := slices.Index(nums, current)
	if i < 0 {
		return 0, 0
	}
	if i > 0 {
		prev = nums[i-1]
	}
	if i+1 < len(nums) {
		next = nums[i+1]
	}
	return prev, next
}

func renderBrief(letter xmlmodels.Letter) briefPageModel {
	model := briefPageModel{
		Number: letter.Letter,
		Pages:  make([]briefRenderPage, 0, len(letter.Data)),
	}
	for _, p := range letter.Data {
		rp := briefRenderPage{
			Number:      p.Number,
			Lines:       renderLines(p.Lines),
			LeftNotes:   make([]briefRenderSidenote, 0, len(p.Sidenotes)),
			RightNotes:  make([]briefRenderSidenote, 0, len(p.Sidenotes)),
			TopNotes:    make([]briefRenderSidenote, 0, len(p.Sidenotes)),
			BottomNotes: make([]briefRenderSidenote, 0, len(p.Sidenotes)),
		}
		for _, sn := range p.Sidenotes {
			rs := briefRenderSidenote{
				Position:   sn.Position,
				PosClass:   sidenotePosClass(sn.Position),
				Annotation: sn.Annotation,
				Lines:      renderLines(sn.Lines),
			}
			switch noteRegion(sn.Position) {
			case "left":
				rp.LeftNotes = append(rp.LeftNotes, rs)
			case "right":
				rp.RightNotes = append(rp.RightNotes, rs)
			case "top":
				rp.TopNotes = append(rp.TopNotes, rs)
			case "bottom":
				rp.BottomNotes = append(rp.BottomNotes, rs)
			default:
				rp.RightNotes = append(rp.RightNotes, rs)
			}
		}
		model.Pages = append(model.Pages, rp)
	}
	return model
}

func noteRegion(position string) string {
	p := strings.ToLower(strings.TrimSpace(position))
	switch {
	case strings.Contains(p, "top"):
		return "top"
	case strings.Contains(p, "bottom"):
		return "bottom"
	case strings.Contains(p, "left"):
		return "left"
	case strings.Contains(p, "right"):
		return "right"
	default:
		return "right"
	}
}

func sidenotePosClass(position string) string {
	p := strings.ToLower(strings.TrimSpace(position))
	p = strings.ReplaceAll(p, " ", "-")
	if p == "" {
		return "pos-right"
	}
	return "pos-" + p
}

func renderLines(lines []xmlmodels.Line) []briefRenderLine {
	out := make([]briefRenderLine, 0, len(lines))
	for _, line := range lines {
		r := briefRenderLine{
			Type:      lineTypeClass(line.Type),
			AlignCtx:  line.AlignCtx,
			TabCtx:    line.TabCtx,
			ClassName: "line line-" + lineTypeClass(line.Type),
			Text:      line.Text,
		}
		r.ClassName += " " + indentClass(line.Indent)
		if line.AlignCtx {
			r.ClassName += " line-align-ctx"
		}
		if line.TabCtx {
			r.ClassName += " line-tab-ctx"
		}
		if line.Type != xmlmodels.Empty {
			r.HTML = template.HTML(renderTokens(line.Tokens))
		}
		out = append(out, r)
	}
	return out
}

func indentClass(indent int) string {
	if indent <= 0 {
		return "line-indent-0"
	}
	if indent > 12 {
		indent = 12
	}
	return "line-indent-" + strconv.Itoa(indent)
}

func lineTypeClass(lt xmlmodels.LineType) string {
	switch lt {
	case xmlmodels.First:
		return "first"
	case xmlmodels.Continuation:
		return "continuation"
	case xmlmodels.Semantic:
		return "semantic"
	case xmlmodels.Indent:
		return "indent"
	case xmlmodels.Empty:
		return "empty"
	default:
		return "semantic"
	}
}

type openToken struct {
	name  string
	attrs map[string]string
}

func renderTokens(tokens []xmlmodels.Token) string {
	var b strings.Builder
	var stack []openToken

	for _, tok := range tokens {
		switch tok.Type {
		case xmlmodels.CharData:
			b.WriteString(html.EscapeString(tok.Value))
		case xmlmodels.StartElement:
			b.WriteString(renderStartTag(tok.Name, tok.Attrs))
			stack = append(stack, openToken{name: tok.Name, attrs: tok.Attrs})
		case xmlmodels.EndElement:
			var attrs map[string]string
			stack, attrs = popAttrsFor(stack, tok.Name)
			b.WriteString(renderEndTag(tok.Name, attrs))
		}
	}

	return b.String()
}

func popAttrsFor(stack []openToken, name string) ([]openToken, map[string]string) {
	for i := len(stack) - 1; i >= 0; i-- {
		if stack[i].name == name {
			attrs := stack[i].attrs
			return append(stack[:i], stack[i+1:]...), attrs
		}
	}
	return stack, nil
}

func renderStartTag(name string, attrs map[string]string) string {
	switch name {
	case "aq":
		return `<span class="tag-aq">`
	case "b":
		return `<strong class="tag-b">`
	case "del":
		return `<del class="tag-del">`
	case "dul":
		return `<span class="tag-dul">`
	case "tul":
		return `<span class="tag-tul">`
	case "er":
		return `<span class="tag-er">`
	case "gr":
		return `<span class="tag-gr">`
	case "hb":
		return `<span class="tag-hb">`
	case "ink":
		return `<span class="tag-ink" data-ref="` + html.EscapeString(attrs["ref"]) + `">`
	case "it":
		return `<em class="tag-it">`
	case "pe":
		return `<span class="tag-pe">`
	case "ru":
		return `<span class="tag-ru">`
	case "tl":
		return `<span class="tag-tl">`
	case "ul":
		return `<span class="tag-ul">`
	case "note":
		return `<span class="tag-note">`
	case "fn":
		return `<span class="tag-fn" data-index="` + html.EscapeString(attrs["index"]) + `">`
	case "nr":
		return `<span class="tag-nr">&middot;`
	case "subst":
		return `<span class="tag-subst">`
	case "insertion":
		return `<span class="tag-insertion">`
	case "hand":
		return `<span class="tag-hand" data-ref="` + html.EscapeString(attrs["ref"]) + `">`
	case "align":
		return `<span class="tag-align align-` + html.EscapeString(attrs["pos"]) + `">`
	case "tab":
		return `<span class="tag-tab" data-tab="` + html.EscapeString(attrs["value"]) + `">`
	default:
		return `<span class="tag-generic" data-tag="` + html.EscapeString(name) + `">`
	}
}

func renderEndTag(name string, attrs map[string]string) string {
	if name == "nr" {
		extent := parseExtent(attrs["extent"])
		return strings.Repeat("&nbsp;", extent) + `&middot;</span>`
	}
	switch name {
	case "b":
		return `</strong>`
	case "it":
		return `</em>`
	case "del":
		return `</del>`
	default:
		return `</span>`
	}
}

func parseExtent(raw string) int {
	if raw == "" {
		return 1
	}
	field := raw
	for i := 0; i < len(raw); i++ {
		if raw[i] == '-' || raw[i] == '|' {
			field = raw[:i]
			break
		}
	}
	n, err := strconv.Atoi(field)
	if err != nil || n < 1 {
		return 1
	}
	return n
}
