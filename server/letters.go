package server

import (
	"bytes"
	"net/http"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/labstack/echo/v5"
)

type dateRange struct {
	Label   string
	Start   int
	End     int
	Letters []letterHeadModel
}

type lettersPageModel struct {
	Ranges        []dateRange
	SelectedRange string
	ShowAll       bool
	ActiveRanges  []dateRange
}

func (s *Server) Home(c *echo.Context) error {
	rangeParam := c.Request().URL.Query().Get("range")
	if rangeParam == "" {
		rangeParam = "all"
	}
	model := buildLettersPageModel(s.app.Library(), rangeParam)
	var out bytes.Buffer
	if err := s.tmpl.ExecuteTemplate(&out, "home", model); err != nil {
		return c.String(http.StatusInternalServerError, "template render failed: "+err.Error())
	}
	return c.HTML(http.StatusOK, out.String())
}

func buildLettersPageModel(lib *xmlmodels.Library, rangeParam string) lettersPageModel {
	ranges := []dateRange{
		{Label: "1756-1770", Start: 1756, End: 1770, Letters: []letterHeadModel{}},
		{Label: "1771-1775", Start: 1771, End: 1775, Letters: []letterHeadModel{}},
		{Label: "1776", Start: 1776, End: 1776, Letters: []letterHeadModel{}},
		{Label: "1777-1779", Start: 1777, End: 1779, Letters: []letterHeadModel{}},
		{Label: "1780-1792", Start: 1780, End: 1792, Letters: []letterHeadModel{}},
	}

	years, yearMap := lib.Years()
	for _, year := range years {
		letters, ok := yearMap[year]
		if !ok {
			continue
		}

		target := -1
		for i := range ranges {
			if year >= ranges[i].Start && year <= ranges[i].End {
				target = i
				break
			}
		}
		if target == -1 {
			continue
		}

		for _, meta := range letters {
			metaCopy := meta
			ranges[target].Letters = append(ranges[target].Letters, buildLetterHead(lib, &metaCopy))
		}
	}

	selected := strings.TrimSpace(rangeParam)
	if selected == "" {
		selected = "all"
	}

	model := lettersPageModel{
		Ranges:        ranges,
		SelectedRange: selected,
		ShowAll:       selected == "all",
		ActiveRanges:  make([]dateRange, 0, len(ranges)),
	}
	if model.ShowAll {
		for _, r := range ranges {
			if len(r.Letters) > 0 {
				model.ActiveRanges = append(model.ActiveRanges, r)
			}
		}
		return model
	}

	for _, r := range ranges {
		if r.Label == selected && len(r.Letters) > 0 {
			model.ActiveRanges = append(model.ActiveRanges, r)
			return model
		}
	}

	model.ShowAll = true
	model.SelectedRange = "all"
	for _, r := range ranges {
		if len(r.Letters) > 0 {
			model.ActiveRanges = append(model.ActiveRanges, r)
		}
	}
	return model
}
