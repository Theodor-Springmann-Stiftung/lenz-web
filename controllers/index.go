package controllers

import (
	"strconv"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

const DEFAULT_YEAR = 1765

func GetIndex(c *fiber.Ctx) error {
	return c.Redirect("/" + strconv.Itoa(DEFAULT_YEAR))
}

func GetIndexYear(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	years, yearmap := lib.Years()

	y := c.Params(YEAR_PARAM)
	year, err := strconv.Atoi(y)
	if _, ok := yearmap[year]; (err != nil || !ok) && y != "all" {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.Render("/", map[string]any{"years": years, "yearmap": yearmap, "year": year, "all": y == "all"})
}
