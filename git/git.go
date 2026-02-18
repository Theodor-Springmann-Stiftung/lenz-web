package git

import (
	"errors"
	"log/slog"
	"os"
	"sync"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

var (
	InvalidBranchError    = errors.New("The currently checked out branch does not match the requested branch. Please checkout the correct branch first.")
	InvalidStateError     = errors.New("The GitProvider is not in a valid state. Fix the issues or continue without Git data.")
	NoURLProvidedError    = errors.New("Missing URL.")
	NoPathProvidedError   = errors.New("Missing path.")
	NoBranchProvidedError = errors.New("Missing branch name.")
)

func OpenOrClone(path, url, branch string) (*Repo, error) {
	r, err := read(path, url, branch)
	if err != nil {
		slog.Debug("read failed, falling back to clone", "path", path, "url", url, "branch", branch, "error", err)
		if _, err := os.Stat(path); err == nil {
			err := os.RemoveAll(path)
			if err != nil {
				return nil, err
			}
		}

		r, err := clone(path, url, branch)
		if err != nil {
			return nil, err
		}

		return r, nil
	}

	return r, nil
}

func read(path, url, branch string) (*Repo, error) {
	if branch == "" {
		return nil, NoBranchProvidedError
	}

	if path == "" {
		return nil, NoPathProvidedError
	}

	if url == "" {
		return nil, NoURLProvidedError
	}

	repo, err := git.PlainOpen(path)
	if err != nil {
		return nil, err
	}

	if err := validateBranch(repo, branch); err != nil {
		br := plumbing.NewBranchReferenceName(branch)
		wt, err := repo.Worktree()
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

		if err := validateBranch(repo, branch); err != nil {
			return nil, err
		}
	}

	return &Repo{
		Repo:   repo,
		Path:   path,
		URL:    url,
		Branch: branch,
		mu:     sync.Mutex{},
	}, nil
}

func clone(path, url, branch string) (*Repo, error) {
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

	return &Repo{
		Repo:   r,
		Path:   path,
		URL:    url,
		Branch: branch,
		mu:     sync.Mutex{},
	}, nil
}

func validateBranch(repo *git.Repository, branch string) error {
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
