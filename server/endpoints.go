package server

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/templates"
	"github.com/labstack/echo/v5"
)

func MapStatic(e *echo.Echo) {
	// INFO: Static files here:
	e.StaticFS("/public", templates.PublicFS)
}
