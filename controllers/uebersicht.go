package controllers

import (
	"strconv"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

func GetLetters(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	years, yearmap := lib.Years()
	y := c.Query(YEAR_PARAM, strconv.Itoa(DEFAULT_YEAR))
	// TODO: does not work ATM
	c.Locals("path", c.Path())

	year, err := strconv.Atoi(y)
	if _, ok := yearmap[year]; (err != nil || !ok) && y != "all" {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.Render(LETTERS_URL+"/", fiber.Map{"years": years, "yearmap": yearmap, "year": year, "all": y == "all"})
}
