package middleware

import (
	"io/fs"
	"net/http"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/helpers/middleware/filesystem"
	"github.com/gofiber/fiber/v2"
)

func StaticHandler(fs *fs.FS, dev bool) fiber.Handler {
	return filesystem.New(filesystem.Config{
		Root:   http.FS(*fs),
		Browse: false,
		Index:  "index.html",
		Dev:    dev,
		MaxAge: 3600,
	})
}
