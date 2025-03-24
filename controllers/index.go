package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

func GetIndex(fiber *fiber.Ctx) error {
	_ = xmlmodels.Get()
	return fiber.Render("/", nil)
}
