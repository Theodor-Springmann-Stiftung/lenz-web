package server

import (
	"log/slog"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func CacheFunc(c *fiber.Ctx) bool {
	path := c.Path()
	// INFO: for now, css and js files are excluded from caching; they get cached via ETag to enable reloading on style changes.
	slog.Debug("CacheFunc:", "path", path)
	return c.Query("noCache") == "true" || c.Response().StatusCode() != fiber.StatusOK || strings.HasPrefix(path, "/assets")
}
