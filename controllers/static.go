package controllers

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Static(url string) fiber.Handler {
	if !strings.HasSuffix(url, "/") {
		url += "/"
	}
	return func(c *fiber.Ctx) error {
		return c.Render(url, map[string]any{})
	}
}
