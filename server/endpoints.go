package server

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/templates"
	"github.com/labstack/echo/v5"
)

// INFO: Static files here:
func MapStatic(e *echo.Echo) {
	e.StaticFS("/public", templates.PublicFS)
}
