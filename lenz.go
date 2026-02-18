package main

import (
	"io/fs"
	"log/slog"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/app"
	_ "github.com/Theodor-Springmann-Stiftung/lenz-web/pages"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/templates"
	"github.com/labstack/echo/v5"
)

func main() {
	cfg, err := GetConfig()
	if err != nil {
		panic(err)
	}

	if cfg.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	application, err := app.New(cfg)
	if err != nil {
		panic(err)
	}

	e := echo.New()
	publicFS, err := fs.Sub(templates.PublicFS, "public")
	if err != nil {
		panic(err)
	}
	e.StaticFS("/public", publicFS)

	for _, route := range application.Routes() {
		routePath := route.Path
		e.GET(routePath, func(c *echo.Context) error {
			out, err := application.RenderPath(routePath)
			if err != nil {
				return err
			}
			return c.HTMLBlob(200, out)
		})
	}

	addr := cfg.Address + ":" + cfg.Port
	if err := e.Start(addr); err != nil {
		panic(err)
	}
}

func GetConfig() (app.Config, error) {
	cp := app.NewConfigProvider([]string{"config.dev.json", "config.json"})
	if err := cp.Read(); err != nil {
		return app.Config{}, err
	}
	return *cp.Config, nil
}
