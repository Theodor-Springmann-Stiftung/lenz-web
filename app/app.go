package app

import (
	"fmt"
	"html/template"
	"path/filepath"
	"sync"
	"sync/atomic"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

type App struct {
	mu     sync.Mutex
	lib    atomic.Pointer[xmlmodels.Library]
	repo   atomic.Pointer[git.Repo]
	tmpl   *template.Template
	routes []Route
	err    error
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
	return a.tmpl
}

func (a *App) Routes() []Route {
	a.mu.Lock()
	defer a.mu.Unlock()

	ret := make([]Route, len(a.routes))
	copy(ret, a.routes)
	return ret
}

func (a *App) RenderPath(path string) ([]byte, error) {
	a.mu.Lock()
	var route *Route
	for i := range a.routes {
		if a.routes[i].Path == path {
			r := a.routes[i]
			route = &r
			break
		}
	}
	a.mu.Unlock()

	if route == nil || route.page == nil {
		return nil, fmt.Errorf("no route for path: %s", path)
	}

	model, err := route.page.Model(a, *route)
	if err != nil {
		return nil, err
	}
	return route.page.Render(a, *route, model)
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
	a.tmpl = tmpl

	routes, err := discoverPages(a)
	if err != nil {
		return err
	}

	a.routes = routes
	a.err = nil
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

	routes, err := discoverPages(a)
	if err != nil {
		return nil, err
	}

	a.routes = routes
	a.err = nil
	return lib, nil
}
