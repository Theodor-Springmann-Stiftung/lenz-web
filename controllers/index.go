package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

const DEFAULT_YEAR = 1765

func GetIndex(fiber *fiber.Ctx) error {
	lib := xmlmodels.Get()
	// Years
	years, yearmap := lib.Years()

	return fiber.Render("/", map[string]any{"years": years, "yearmap": yearmap})
}
