package main

import (
	"log/slog"
	"path/filepath"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/app"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/git"
)

func main() {
	cfg, err := GetConfig()
	if err != nil {
		panic(err)
	}

	if cfg.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	dir := filepath.Join(cfg.BaseDIR, cfg.GITPath)
	repo, err := git.OpenOrClone(dir, cfg.GitURL, cfg.GitBranch)
	if err != nil {
		panic(err)
	}

	println("Repo opened: " + repo.String())

	latest, err := repo.Latest()
	if err != nil {
		panic(err)
	}

	println("Commit" + latest.String())
}

func GetConfig() (app.Config, error) {
	cp := app.NewConfigProvider([]string{"config.dev.json", "config.json"})
	return *cp.Config, cp.Read()
}
