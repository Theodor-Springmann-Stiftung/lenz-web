package app

import (
	"html/template"
	"io/fs"
	"path/filepath"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/templates"
)

func (a *App) Error() error {
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.err
}

func discoverPages(app *App) ([]Route, error) {
	var routes []Route
	for _, page := range RegisteredPages() {
		discovered, err := page.Discover(app)
		if err != nil {
			return nil, err
		}
		for i := range discovered {
			discovered[i].page = page
		}
		routes = append(routes, discovered...)
	}
	return routes, nil
}

func parseTemplates() (*template.Template, error) {
	paths := make([]string, 0, 16)

	err := fs.WalkDir(templates.FS, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}

		switch strings.ToLower(filepath.Ext(path)) {
		case ".tmpl", ".html", ".gohtml":
			paths = append(paths, path)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return template.New("root").ParseFS(templates.FS, paths...)
}
