package server

import (
	"time"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/templating"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/storage/memory/v2"
)

const (
	// INFO: This timeout is stupid.
	// Uploads can take a long time, other routes might not. It's messy.
	REQUEST_TIMEOUT = 120 * time.Second
	SERVER_TIMEOUT  = 120 * time.Second

	// INFO: Maybe this is too long/short?
	CACHE_TIME        = 24 * time.Hour
	CACHE_GC_INTERVAL = 120 * time.Second
)

const (
	STATIC_FILEPATH = "./views/assets"
	ROUTES_FILEPATH = "./views/routes"
	LAYOUT_FILEPATH = "./views/layouts"
)

type Server struct {
	Engine *templating.Engine
	Server *fiber.App
	Cache  *memory.Storage
}

func New(engine *templating.Engine, debug bool) Server {
	c := memory.New(memory.Config{
		GCInterval: CACHE_GC_INTERVAL,
	})

	server := fiber.New(fiber.Config{
		AppName:           "Lenz",
		CaseSensitive:     false,
		ErrorHandler:      fiber.DefaultErrorHandler,
		WriteTimeout:      REQUEST_TIMEOUT,
		ReadTimeout:       REQUEST_TIMEOUT,
		PassLocalsToViews: true,
		Views:             engine,
		EnablePrintRoutes: debug,
		ViewsLayout:       templating.DEFAULT_LAYOUT_NAME,
		UnescapePath:      true,
	})

	if debug {
		server.Use(logger.New())
	}

	server.Use(recover.New())

	if debug {
		server.Use(cache.New(cache.Config{
			Next:         CacheFunc,
			Expiration:   CACHE_TIME,
			CacheControl: false,
			Storage:      c,
		}))
	} else {
		server.Use(cache.New(cache.Config{
			Next:         CacheFunc,
			Expiration:   CACHE_TIME,
			CacheControl: true,
			Storage:      c,
		}))
	}

	return Server{
		Engine: engine,
		Server: server,
		Cache:  c,
	}
}
