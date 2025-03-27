package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"

	"github.com/gofiber/fiber/v2/middleware/compress"
)

const ASSETS_URL = "/assets"
const INDEX_URL = "/"
const YEAR_PARAM = "year"
const LETTER_PARAM = "letter"

var INDEX_YEAR_URL = "/:" + YEAR_PARAM
var LETTER_URL = "/brief/:" + LETTER_PARAM

func Register(server server.Server, cfg config.Config) {
	server.Server.Use(ASSETS_URL, compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS))
	server.Server.Get(INDEX_URL, GetIndex)
	server.Server.Get(INDEX_YEAR_URL, GetIndexYear)
	server.Server.Get(LETTER_URL, GetLetter)

	// INFO: we map the webhook when a secret was provided
	if cfg.WebHookSecret != "" {
		server.Server.Post(cfg.WebHookEndpoint, PostWebhook(cfg))
	}

}
