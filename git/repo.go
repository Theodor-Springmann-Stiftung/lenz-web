package git

import (
	"fmt"
	"os"
	"sync"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

type Repo struct {
	Repo   *git.Repository
	Path   string
	URL    string
	Branch string
	latest *Commit
	mu     sync.Mutex
}

func (r *Repo) String() string {
	if r == nil {
		return "<nil>"
	}
	return fmt.Sprintf("Path: %s\nURL: %s\nBranch: %s", r.Path, r.URL, r.Branch)
}

// INFO: If this return true, there are new commit(s) available
func (c *Repo) Pull() (bool, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.URL == "" {
		return false, NoURLProvidedError
	}

	if c.Branch == "" {
		return false, NoPathProvidedError
	}

	if c.Path == "" {
		return false, NoPathProvidedError
	}

	if c.Repo == nil {
		return false, InvalidStateError
	}

	br := plumbing.NewBranchReferenceName(c.Branch)

	wt, err := c.Repo.Worktree()
	if err != nil {
		return false, err
	}
	defer wt.Clean(&git.CleanOptions{Dir: true})

	if err := wt.Pull(&git.PullOptions{
		RemoteName:    "origin",
		ReferenceName: br,
		Progress:      os.Stdout,
	}); err != nil && err != git.NoErrAlreadyUpToDate {
		return false, err
	} else if err == git.NoErrAlreadyUpToDate {
		return false, nil
	}

	return true, nil
}

func (r *Repo) Latest() (*Commit, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.latest != nil {
		c := *r.latest
		return &c, nil
	}

	log, err := r.Repo.Log(&git.LogOptions{})
	if err != nil {
		return nil, err
	}
	defer log.Close()

	commit, err := log.Next()
	if err != nil {
		return nil, err
	}

	r.latest = &Commit{
		Repo:   r,
		Branch: r.Branch,
		Path:   r.Path,
		URL:    r.URL,
		Name:   commit.Author.Name,
		Email:  commit.Author.Email,
		Hash:   commit.Hash.String(),
		Date:   commit.Author.When,
	}

	// WARNING: do not change this, return a copy of the data
	// otherwise the commit might change unexpectedly
	c := *r.latest
	return &c, nil
}
