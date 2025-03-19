package server

import (
	"time"

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
	})}
}
