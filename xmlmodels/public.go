package xmlmodels

import (
	"sync"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
)

var lib *Library
var mu sync.RWMutex

func Set(l *Library) {
	mu.Lock()
	defer mu.Unlock()
	if lib != nil {
		panic("Trying to reinitialize Library")
	}
	lib = l
}

func Get() *Library {
	mu.RLock()
	defer mu.RUnlock()
	if lib == nil {
		panic("Trying to get uninitialized Library")
	}
	return lib
}

func New(dir, hash string) error {
	Set(NewLibrary())
	return Parse(dir, hash)
}

func Parse(dir, hash string) error {
	if hash == "" {
		return lib.Parse(xmlparsing.Path, dir, hash)
	}
	return lib.Parse(xmlparsing.Commit, dir, hash)
}
