package controllers

import (
	"strconv"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

func GetLetter(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	l := c.Params(LETTER_PARAM)
	letter, err := strconv.Atoi(l)
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	meta := lib.Metas.Item(letter)
	if meta == nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	text := lib.Letters.Item(letter)
	tradition := lib.Traditions.Item(letter)

	return c.Render("/brief/", map[string]any{"meta": meta, "text": text, "tradition": tradition})
}
