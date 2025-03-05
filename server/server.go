package server

import "time"

const (
	// INFO: This timeout is stupid. Uploads can take a long time, other routes might not. It's messy.
	REQUEST_TIMEOUT = 16 * time.Second
	SERVER_TIMEOUT  = 16 * time.Second

	// INFO: Maybe this is too long/short?
	CACHE_TIME        = 24 * time.Hour
	CACHE_GC_INTERVAL = 120 * time.Second
)

const (
	STATIC_FILEPATH = "./views/assets"
	ROUTES_FILEPATH = "./views/routes"
	LAYOUT_FILEPATH = "./views/layouts"
)
