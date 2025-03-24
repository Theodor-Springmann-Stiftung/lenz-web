package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"

	"github.com/gofiber/fiber/v2/middleware/compress"
)

const ASSETS_URL = "/assets"

func Register(server server.Server) {
	server.Server.Use(ASSETS_URL, compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS))
	server.Server.Get("/", GetIndex)
}
