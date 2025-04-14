package server

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/storage/memory/v2"
)

type Cache struct {
	*memory.Storage
}

const (
	CACHE_GC_INTERVAL = 24 * time.Hour
)

func NewCache() Cache {
	return Cache{memory.New(memory.Config{
		GCInterval: CACHE_GC_INTERVAL,
	}),
	}
}

func KeyGenerator(c *fiber.Ctx) string {
	return c.Path() + c.Context().QueryArgs().String()
}
