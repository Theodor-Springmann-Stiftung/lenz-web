package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

func GetLetters(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	_, yearmap := lib.Years()
	rangeParam := c.Query("range", "")
	// TODO: does not work ATM
	c.Locals("path", c.Path())

	// Define the date ranges
	ranges := []DateRange{
		{Label: "1756–1770", Start: 1756, End: 1770, Letters: []xmlmodels.Meta{}},
		{Label: "1771–1775", Start: 1771, End: 1775, Letters: []xmlmodels.Meta{}},
		{Label: "1776", Start: 1776, End: 1776, Letters: []xmlmodels.Meta{}},
		{Label: "1777–1779", Start: 1777, End: 1779, Letters: []xmlmodels.Meta{}},
		{Label: "1780–1792", Start: 1780, End: 1792, Letters: []xmlmodels.Meta{}},
	}

	// Group letters by date ranges
	for year, letters := range yearmap {
		for i := range ranges {
			if year >= ranges[i].Start && year <= ranges[i].End {
				ranges[i].Letters = append(ranges[i].Letters, letters...)
				break
			}
		}
	}

	// Handle specific range selection
	selectedRange := -1
	for i, r := range ranges {
		if r.Label == rangeParam {
			selectedRange = i
			break
		}
	}

	return c.Render(LETTERS_URL+"/", fiber.Map{
		"ranges": ranges,
		"selectedRange": selectedRange,
		"all": rangeParam == "all",
	})
}
