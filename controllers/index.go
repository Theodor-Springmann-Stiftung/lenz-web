package controllers

import (
	"github.com/gofiber/fiber/v2"
	"strconv"
)

const DEFAULT_YEAR = 1765

func GetIndex(c *fiber.Ctx) error {
	return c.Redirect(LETTERS_URL + "?year=" + strconv.Itoa(DEFAULT_YEAR))
}
