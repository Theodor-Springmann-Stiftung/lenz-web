package pages

import (
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
