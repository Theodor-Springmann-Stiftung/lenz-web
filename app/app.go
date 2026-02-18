package app

import (
	"sync"
	"sync/atomic"

	gitpkg "github.com/Theodor-Springmann-Stiftung/lenz-web/git"
	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

type App struct {
	mu  sync.Mutex
	lib atomic.Pointer[xmlmodels.Library]
}

func New() *App {
	return &App{}
}

func (a *App) Library() *xmlmodels.Library {
	return a.lib.Load()
}

func (a *App) RefreshLibrary(dir string, commit *gitpkg.Commit) (*xmlmodels.Library, error) {
	a.mu.Lock()
	defer a.mu.Unlock()

	lib, err := xmlmodels.Parse(dir, commit)
	if err != nil {
		return nil, err
	}

	a.lib.Store(lib)
	return lib, nil
}
