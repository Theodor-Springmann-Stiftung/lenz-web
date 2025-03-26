package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"

	"github.com/gofiber/fiber/v2/middleware/compress"
)

const ASSETS_URL = "/assets"
const WBHOOK_URL = "/webhook"

func Register(server server.Server, cfg config.Config) {
	server.Server.Use(ASSETS_URL, compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS))
	server.Server.Get("/", GetIndex)

	if cfg.WebHookSecret != "" {
		whurl := WBHOOK_URL
		if cfg.WebHookEndpoint != "" {
			whurl = cfg.WebHookEndpoint
		}
		server.Server.Post(whurl, PostWebhook(cfg))
	}

}
