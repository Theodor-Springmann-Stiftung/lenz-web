package main

import (
	"log/slog"
	"path/filepath"
	"time"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	gitprovider "github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/server"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/templating"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/views"
	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/storage/memory/v2"
)

var REFRESH_CHANGES = []string{
	"./views/assets",
}

var RESET_CHANGES = []string{
	"./views/layouts",
	"./views/routes",
}

func main() {
	cfg, err := config.Get()
	if err != nil {
		panic(err)
	}

	if cfg.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	dir := filepath.Join(cfg.BaseDIR, cfg.GITPath)

	gp, err := gitprovider.OpenOrClone(dir, cfg.GitURL, cfg.GitBranch)

	if err != nil {
		panic(err)
	}

	// INFO: the lib, engine and storage objects passed to the server are not made to
	// be recreated.
	lib := xmlmodels.NewLibrary()
	lib.Parse(xmlparsing.Commit, dir, gp.Hash)

	engine := templating.New(&views.LayoutFS, &views.RoutesFS)
	storage := memory.New(memory.Config{
		GCInterval: 24 * time.Hour,
	})

	if cfg.Debug {
		SetupDebug(storage, engine)
	}

	server := server.New(engine, storage, cfg.Debug)

	server.Start(cfg.Address + ":" + cfg.Port)
}

func SetupDebug(storage fiber.Storage, engine *templating.Engine) {
	SetupRefreshWatcher(storage, engine)
	SetupReloadWatcher(storage, engine)
	engine.Debug()
}

func SetupRefreshWatcher(storage fiber.Storage, engine *templating.Engine) {
	refreshwatcher, err := New(func() { RefreshFunction(storage, engine) })
	if err != nil {
		slog.Error("Error setting up refresh watcher, continuing without: ", "error:", err)
		return
	}

	for _, path := range REFRESH_CHANGES {
		refreshwatcher.AddRecursive(path)
	}
}

func SetupReloadWatcher(storage fiber.Storage, engine *templating.Engine) {
	resetwatcher, err := New(func() { ResetFunction(storage, engine) })
	if err != nil {
		slog.Error("Error setting up refresh watcher, continuing without: ", "error:", err)
		return
	}

	for _, path := range RESET_CHANGES {
		resetwatcher.AddRecursive(path)
	}
}

func ResetFunction(storage fiber.Storage, engine *templating.Engine) {
	storage.Reset()
	engine.Reload()
}

func RefreshFunction(storage fiber.Storage, engine *templating.Engine) {
	storage.Reset()
	engine.Refresh()
}
