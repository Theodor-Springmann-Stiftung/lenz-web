//go:build dev

package templates

import (
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"runtime"
)

var (
	FS       fs.FS
	PublicFS fs.FS
)

// INFO: We use the currrent embeds file path to create the FS.
// This is used in builds tagged with dev only, to serve files from the FS.
func init() {
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("cannot resolve templates path from runtime.Caller")
	}

	base := filepath.Dir(file)
	FS = os.DirFS(base)
	PublicFS = os.DirFS(base)
}
