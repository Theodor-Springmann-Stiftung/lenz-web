package server

import (
	"time"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/templating"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

const (
	// INFO: This timeout is stupid.
	// Uploads can take a long time, other routes might not. It's messy.
	REQUEST_TIMEOUT = 120 * time.Second
	SERVER_TIMEOUT  = 120 * time.Second

	// INFO: Maybe this is too long/short?
	CACHE_TIME = 24 * time.Hour
)

const (
	STATIC_FILEPATH = "./views/assets"
	ROUTES_FILEPATH = "./views/routes"
	LAYOUT_FILEPATH = "./views/layouts"
)

type Server struct {
	Engine *templating.Engine
	Server *fiber.App
	Cache  fiber.Storage
}

func New(engine *templating.Engine, storage fiber.Storage, debug bool) Server {
	server := fiber.New(fiber.Config{
		AppName:           "Lenz",
		CaseSensitive:     false,
		ErrorHandler:      fiber.DefaultErrorHandler,
		WriteTimeout:      REQUEST_TIMEOUT,
		ReadTimeout:       REQUEST_TIMEOUT,
		Views:             engine,
		EnablePrintRoutes: debug,
		ViewsLayout:       templating.DEFAULT_LAYOUT_NAME,
		UnescapePath:      true,
		// BUG: does not work rn:
		PassLocalsToViews: true,
	})

	if debug {
		server.Use(cache.New(cache.Config{
			Next:         CacheFunc,
			Expiration:   CACHE_TIME,
			CacheControl: false,
			Storage:      storage,
			KeyGenerator: KeyGenerator,
		}))
		server.Use(logger.New())
	}

	if !debug {
		server.Use(cache.New(cache.Config{
			Next:         CacheFunc,
			Expiration:   CACHE_TIME,
			CacheControl: true,
			Storage:      storage,
			KeyGenerator: KeyGenerator,
		}))
		server.Use(recover.New())
	}

	return Server{
		Engine: engine,
		Server: server,
		Cache:  storage,
	}
}

func (s *Server) Start(addr string) error {
	s.Cache.Reset()
	return s.Server.Listen(addr)
}

func (s *Server) Stop() error {
	s.Cache.Close()
	return s.Server.Shutdown()
}
