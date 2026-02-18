package app

import "sync"

type Route struct {
	Path string
	Kind string
	ID   string
	page Page
}

type Page interface {
	Discover(app *App) ([]Route, error)
	Model(app *App, route Route) (map[string]any, error)
	Render(app *App, route Route, model map[string]any) ([]byte, error)
}

var (
	pagesMu sync.RWMutex
	pages   []Page
)

func RegisterPage(page Page) {
	if page == nil {
		panic("cannot register nil page")
	}

	pagesMu.Lock()
	defer pagesMu.Unlock()
	pages = append(pages, page)
}

func RegisteredPages() []Page {
	pagesMu.RLock()
	defer pagesMu.RUnlock()

	ret := make([]Page, len(pages))
	copy(ret, pages)
	return ret
}
