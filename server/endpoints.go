package server

import (
	"io/fs"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/templates"
	"github.com/labstack/echo/v5"
)

// INFO: Static files here:
func MapStatic(e *echo.Echo) {
	publicFS, err := fs.Sub(templates.PublicFS, "public")
	if err != nil {
		// fallback keeps server running even if FS layout changes unexpectedly
		e.StaticFS("/public", templates.PublicFS)
		return
	}
	e.StaticFS("/public", publicFS)
}

func MapEndpoints(e *echo.Echo, s *Server) {
	e.GET("/", s.Home)
	e.GET("/briefe", s.Home)
	e.GET("/brief/:number", s.Brief)
}
