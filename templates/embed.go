//go:build !dev

package templates

import (
	"embed"
	"io/fs"
)

// FS contains all template files.
//
//go:embed layouts pages components
var rawFS embed.FS

var FS fs.FS = rawFS

// PublicFS contains static assets (js, css, images, ...).
//
//go:embed public
var rawPublicFS embed.FS

var PublicFS fs.FS = rawPublicFS
