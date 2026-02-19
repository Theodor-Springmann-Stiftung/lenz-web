package app

type Route struct {
	Path string
	Kind string
	ID   string
	page Page
}

type Page interface {
	Discover(app *App) ([]Route, error)
	Model(app *App, route Route) (map[string]any, error)
}

var pages []Page

func RegisterPage(page Page) {
	if page == nil {
		panic("cannot register nil page")
	}

	pages = append(pages, page)
}

func RegisteredPages() []Page {
	ret := make([]Page, len(pages))
	copy(ret, pages)
	return ret
}
