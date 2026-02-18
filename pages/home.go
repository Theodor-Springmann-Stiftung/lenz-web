package pages

import (
	"bytes"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/app"
)

type HomePage struct{}

func init() {
	app.RegisterPage(HomePage{})
}

func (p HomePage) Discover(a *app.App) ([]app.Route, error) {
	return []app.Route{
		{Path: "/", Kind: "page", ID: "home"},
	}, nil
}

func (p HomePage) Model(a *app.App, route app.Route) (map[string]any, error) {
	return map[string]any{
		"Message": "Template system is working.",
	}, nil
}

func (p HomePage) Render(a *app.App, route app.Route, model map[string]any) ([]byte, error) {
	var buf bytes.Buffer
	if err := a.Templates().ExecuteTemplate(&buf, "home", model); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
