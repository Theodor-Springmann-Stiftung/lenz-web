package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

const DEFAULT_YEAR = 1765

type DateRange struct {
	Label   string
	Start   int
	End     int
	Letters []xmlmodels.Meta
}

func GetIndex(c *fiber.Ctx) error {
	return c.Redirect(LETTERS_URL + "?range=all")
}
