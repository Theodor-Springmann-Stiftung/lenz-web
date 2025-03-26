package gitprovider

import (
	"errors"
	"fmt"
	"os"
	"sync"
	"time"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

var InvalidBranchError = errors.New("The currently checked out branch does not match the requested branch. Please checkout the correct branch first.")
var InvalidStateError = errors.New("The GitProvider is not in a valid state. Fix the issues or continue without Git data.")
var NoURLProvidedError = errors.New("Missing URL.")
var NoPathProvidedError = errors.New("Missing path.")
var NoBranchProvidedError = errors.New("Missing branch name.")

var mu sync.Mutex
var repo *git.Repository

type Commit struct {
	Path   string
	URL    string
	Branch string
	Hash   string
	Date   time.Time
}

func IsValidRepository(path, url, branch string) *Commit {
	commit, _ := Read(path, branch, url)
	return commit
}

// WARNING: Only OpenOrClone() and Pull() should be used externally.
func OpenOrClone(path, url, branch string) (*Commit, error) {
	mu.Lock()
	defer mu.Unlock()

	commit := IsValidRepository(path, url, branch)
	if commit == nil {
		if _, err := os.Stat(path); err == nil {
			err := os.RemoveAll(path)
			if err != nil {
				return nil, err
			}
		}

		c, err := Clone(path, url, branch)
		if err != nil {
			return nil, err
		}
		return c, nil
	}

	return commit, nil
}

func Pull(path, url, branch string) (*Commit, error) {
	mu.Lock()
	defer mu.Unlock()

	if url == "" {
		return nil, NoURLProvidedError
	}

	if branch == "" {
		return nil, NoPathProvidedError
	}

	if path == "" {
		return nil, NoPathProvidedError
	}

	br := plumbing.NewBranchReferenceName(branch)

	var r *git.Repository
	if repo == nil {
		rep, err := git.PlainOpen(path)
		if err != nil {
			return nil, err
		}
		r = rep
	} else {
		r = repo
	}

	wt, err := r.Worktree()
	if err != nil {
		return nil, err
	}

	if err := wt.Pull(&git.PullOptions{
		RemoteName:    "origin",
		ReferenceName: br,
		Progress:      os.Stdout,
	}); err != nil && err != git.NoErrAlreadyUpToDate {
		return nil, err
	}
	defer wt.Clean(&git.CleanOptions{Dir: true})

	repo = r

	return latestCommit(repo, path, branch, url)
}

func Read(path, branch, url string) (*Commit, error) {
	if branch == "" {
		return nil, NoBranchProvidedError
	}

	if path == "" {
		return nil, NoPathProvidedError
	}

	if url == "" {
		return nil, NoURLProvidedError
	}

	var r *git.Repository
	if repo == nil {
		rep, err := git.PlainOpen(path)
		if err != nil {
			return nil, err
		}
		r = rep
	} else {
		r = repo
	}

	if err := ValidateBranch(r, branch); err != nil {
		br := plumbing.NewBranchReferenceName(branch)
		wt, err := r.Worktree()
		if err != nil {
			return nil, err
		}
		defer wt.Clean(&git.CleanOptions{Dir: true})

		if err := wt.Checkout(&git.CheckoutOptions{
			Branch: br,
			Force:  true,
		}); err != nil {
			return nil, err
		}

		if err := ValidateBranch(repo, branch); err != nil {
			return nil, err
		}
	}

	repo = r
	return latestCommit(r, path, branch, url)
}

func Clone(path, url, branch string) (*Commit, error) {
	if url == "" {
		return nil, NoURLProvidedError
	}

	if branch == "" {
		return nil, NoBranchProvidedError
	}

	if path == "" {
		return nil, NoPathProvidedError
	}

	br := plumbing.NewBranchReferenceName(branch)

	r, err := git.PlainClone(path, false, &git.CloneOptions{
		URL:      url,
		Progress: os.Stdout,
	})

	if err != nil {
		return nil, err
	}

	wt, err := r.Worktree()
	if err != nil {
		return nil, err
	}
	defer wt.Clean(&git.CleanOptions{Dir: true})

	if err := wt.Checkout(&git.CheckoutOptions{
		Branch: br,
		Force:  true,
	}); err != nil {
		return nil, err
	}

	repo = r
	return latestCommit(r, path, branch, url)
}

func (g Commit) String() string {
	return fmt.Sprintf("Path: %s\nURL: %s\nBranch: %s\nHash: %s\nDate: %s", g.Path, g.URL, g.Branch, g.Hash, g.Date)
}

func (g Commit) Pull() (*Commit, error) {
	return Pull(g.Path, g.URL, g.Branch)
}

func latestCommit(repo *git.Repository, path, branch, url string) (*Commit, error) {
	log, err := repo.Log(&git.LogOptions{})
	if err != nil {
		return nil, err
	}
	defer log.Close()

	commit, err := log.Next()
	if err != nil {
		return nil, err
	}

	c := commit.Hash.String()
	d := commit.Author.When

	return &Commit{Path: path, URL: url, Branch: branch, Hash: c, Date: d}, nil
}

func ValidateBranch(repo *git.Repository, branch string) error {
	head, err := repo.Head()
	if err != nil {
		return err
	}

	cbranch := head.Name().Short()
	if cbranch != branch {
		return InvalidBranchError
	}

	return nil
}

func (g Commit) ValidateCommit() error {
	if g.Hash == "" || g.Date.IsZero() {
		return InvalidStateError
	}
	return nil
}
