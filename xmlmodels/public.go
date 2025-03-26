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

func Parse(dir, hash string) (*Library, error) {
	if lib == nil {
		Set(NewLibrary())
	}

	if hash == "" {
		return Get(), lib.Parse(xmlparsing.Path, dir, hash)
	}

	return Get(), lib.Parse(xmlparsing.Commit, dir, hash)
}
