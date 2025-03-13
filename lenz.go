package main

import (
	"fmt"
	"log/slog"
	"path/filepath"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/config"
	gitprovider "github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

func main() {
	cfg, err := config.Get()
	if err != nil {
		panic(err)
	}

	if cfg.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	dir := filepath.Join(cfg.BaseDIR, cfg.GITPath)

	gp, err := gitprovider.NewGitProvider(cfg.GitURL, dir, cfg.GitBranch)

	if err != nil {
		panic(err)
	}

	lib := xmlmodels.NewLibrary()
	lib.Parse(xmlparsing.Commit, dir, gp.Commit)

	fmt.Println("Library: ", lib)
}
