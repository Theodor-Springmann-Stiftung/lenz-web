package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"

	"github.com/gofiber/fiber/v2/middleware/compress"
)

const INDEX_URL = "/"
const ASSETS_URL = "/assets"
const DATENSCHUTZ_URL = "/datenschutz"
const JAHRGAENGE_URL = "/jahrgang"
const ZITATION_URL = "/ausgabe/zitation"
const EDITION_URL = "/ausgabe/edition"
const KONTAKT_URL = "/kontakt"

var INDEX_YEAR_URL = JAHRGAENGE_URL + "/:" + YEAR_PARAM
var LETTER_URL = "/brief/:" + LETTER_PARAM

const YEAR_PARAM = "year"
const LETTER_PARAM = "letter"

func Register(server server.Server, cfg config.Config) {
	server.Server.Use(ASSETS_URL, compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS))
	server.Server.Get(INDEX_URL, GetIndex)
	server.Server.Get(INDEX_YEAR_URL, GetIndexYear)
	server.Server.Get(LETTER_URL, GetLetter)
	server.Server.Get(DATENSCHUTZ_URL, Static(DATENSCHUTZ_URL+"/"))

	// INFO: we map the webhook when a secret was provided
	if cfg.WebHookSecret != "" {
		server.Server.Post(cfg.WebHookEndpoint, PostWebhook(cfg))
	}

}
