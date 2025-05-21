package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/etag"
)

const (
	INDEX_URL       = "/"
	ASSETS_URL      = "/assets"
	DATENSCHUTZ_URL = "/datenschutz"
	LETTERS_URL     = "/briefe"
	ZITATION_URL    = "/ausgabe/zitation"
	EDITION_URL     = "/ausgabe/edition"
	KONTAKT_URL     = "/kontakt"
	LETTER_URL      = "/brief/:" + LETTER_PARAM
	YEAR_PARAM      = "year"
	LETTER_PARAM    = "letter"
)

func Register(server server.Server, cfg config.Config) {
	server.Server.Use(ASSETS_URL, compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.Server.Use(ASSETS_URL, etag.New())
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS, cfg.Debug))

	server.Server.Use(func(ctx *fiber.Ctx) error {
		ctx.Locals("cfg", cfg)
		ctx.Locals("path", ctx.Path())
		return ctx.Next()
	})

	server.Server.Get(INDEX_URL, GetIndex)
	server.Server.Get(LETTERS_URL, GetLetters)
	server.Server.Get(LETTER_URL, GetLetter)
	server.Server.Get(DATENSCHUTZ_URL, Static(DATENSCHUTZ_URL+"/"))

	// INFO: we map the webhook when a secret was provided
	if cfg.WebHookSecret != "" {
		server.Server.Post(cfg.WebHookEndpoint, PostWebhook(cfg, server))
	}

}
