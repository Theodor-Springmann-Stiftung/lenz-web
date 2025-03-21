package main

import (
	"io/fs"
	"log/slog"
	"os"
	"path/filepath"
	"time"

	"github.com/fsnotify/fsnotify"
)

const (
	WATCHER_DEBOUNCE = 300 * time.Millisecond
)

// INFO: this is hot reload for poor people
type Watcher struct {
	*fsnotify.Watcher
}

func New(fn func()) (*Watcher, error) {
	watcher := Watcher{}
	w, err := fsnotify.NewWatcher()
	if err != nil {
		return nil, err
	}
	watcher.Watcher = w

	done := make(chan bool)

	go func() {
		var reloadTimer *time.Timer

		for {
			select {
			case event := <-watcher.Events:
				if event.Op&(fsnotify.Create|fsnotify.Write|fsnotify.Remove|fsnotify.Rename) != 0 {
					if reloadTimer != nil {
						reloadTimer.Stop()
					}
					reloadTimer = time.AfterFunc(WATCHER_DEBOUNCE, func() {
						slog.Debug("Changes detected, reloading templates...")
						fn()
					})
				}

				if event.Op&fsnotify.Create == fsnotify.Create {
					fi, statErr := os.Stat(event.Name)
					if statErr == nil && fi.IsDir() {
						_ = watcher.Add(event.Name)
						slog.Debug("Now watching new directory", "path", event.Name)
					}
				}

			case err := <-watcher.Errors:
				if err != nil {
					slog.Error("fsnotify error", "error", err)
				}

			case <-done:
				watcher.Close()
				return
			}
		}
	}()

	return &watcher, nil
}

func (w *Watcher) AddRecursive(root string) error {
	return filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			werr := w.Add(path)
			if werr != nil {
				return werr
			}
			slog.Debug("Now watching directory", "path", path)
		}
		return nil
	})
}
