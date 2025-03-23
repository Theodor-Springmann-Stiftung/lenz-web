package controllers

import (
	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"
)

const ASSETS_URL = "/assets"

func Register(server server.Server) {
	server.Server.Use(ASSETS_URL, middleware.StaticHandler(&views.StaticFS))
}
