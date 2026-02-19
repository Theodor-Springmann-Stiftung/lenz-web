package app

import (
	"html/template"
	"path/filepath"
	"sync"
	"sync/atomic"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

type App struct {
	mu   sync.Mutex
	lib  atomic.Pointer[xmlmodels.Library]
	repo atomic.Pointer[git.Repo]
	tmpl atomic.Pointer[*template.Template]
	cfg  Config
}

func New(cfg Config) (*App, error) {
	a := &App{}
	if err := a.init(cfg); err != nil {
		return nil, err
	}
	return a, nil
}

func (a *App) Library() *xmlmodels.Library {
	return a.lib.Load()
}

func (a *App) Repo() *git.Repo {
	return a.repo.Load()
}

func (a *App) Templates() *template.Template {
	return *a.tmpl.Load()
}

func (a *App) Config() Config {
	return a.cfg
}

func (a *App) Pages() []Page {
	return RegisteredPages()
}

func (a *App) init(cfg Config) error {
	a.mu.Lock()
	defer a.mu.Unlock()

	path := filepath.Join(cfg.BaseDIR, cfg.GITPath)

	repo, err := git.OpenOrClone(path, cfg.GitURL, cfg.GitBranch)
	if err != nil {
		return err
	}

	if _, err := repo.Pull(); err != nil {
		return err
	}

	latest, err := repo.Latest()
	if err != nil {
		return err
	}

	lib, err := xmlmodels.Parse(repo.Path, latest)
	if err != nil {
		return err
	}
	tmpl, err := parseTemplates()
	if err != nil {
		return err
	}

	a.repo.Store(repo)
	a.lib.Store(lib)
	a.tmpl.Store(&tmpl)

	a.cfg = cfg
	return nil
}

func (a *App) RefreshLibrary(dir string, commit *git.Commit) (*xmlmodels.Library, error) {
	a.mu.Lock()
	defer a.mu.Unlock()

	lib, err := xmlmodels.Parse(dir, commit)
	if err != nil {
		return nil, err
	}

	a.lib.Store(lib)

	return lib, nil
}
