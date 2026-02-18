package git

import (
	"fmt"
	"time"
)

type Commit struct {
	Repo   *Repo
	Path   string
	URL    string
	Branch string
	Hash   string
	Email  string
	Name   string
	Date   time.Time
}

func (g *Commit) ValidateCommit() error {
	if g.Hash == "" || g.Date.IsZero() {
		return InvalidStateError
	}
	return nil
}

func (g Commit) String() string {
	return fmt.Sprintf("Path: %s\nURL: %s\nBranch: %s\nHash: %s\nDate: %s", g.Path, g.URL, g.Branch, g.Hash, g.Date)
}
