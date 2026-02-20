package server

import (
	"html/template"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/app"
	"github.com/labstack/echo/v5"
)

// WARNING: this is not thread-safe. You can not write and read from the server at the same time!
type Server struct {
	server *echo.Echo
	cfg    app.Config
	tmpl   *template.Template
	app    *app.App
}

func NewServer(app *app.App) (*Server, error) {
	s := &Server{
		server: echo.New(),
		cfg:    app.Config(),
		tmpl:   app.Templates(),
		app:    app,
	}

	// INFO: Endpoint mapping here:
	MapStatic(s.server)
	MapEndpoints(s.server, s)

	return s, nil
}

func (s *Server) Start() error {
	addr := s.cfg.Address + ":" + s.cfg.Port
	if err := s.server.Start(addr); err != nil {
		return err
	}
	return nil
}
