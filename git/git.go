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
var NoURLProvidedError = errors.New("No URL provided for GitProvider.")
var NoPathProvidedError = errors.New("No path or branch provided for GitProvider.")

// NOTE: GitProvider does not open any worktree files, it only
// - reads in information from the repo, given a path
// - clones a repo, given an URL & a path
// - pulls a repo, given a path
// In case of success it updates it's state: the commit hash and date. Then it closes the repo.
type GitProvider struct {
	mu sync.Mutex

	URL    string
	Path   string
	Branch string
	Commit string
	Date   time.Time
}

func NewGitProvider(url string, path string, branch string) (*GitProvider, error) {
	// TODO: check if directory is empty
	// TODO: force clone
	if _, err := os.Stat(path); err == nil {
		return GitProviderFromPath(path, branch)
	}

	return GitProviderFromURL(url, path, branch)
}

func GitProviderFromPath(path string, branch string) (*GitProvider, error) {
	if branch == "" || path == "" {
		return nil, NoPathProvidedError
	}

	gp := GitProvider{Path: path, Branch: branch}
	if err := gp.Read(); err != nil {
		return nil, err
	}

	return &gp, nil
}

func GitProviderFromURL(url string, path string, branch string) (*GitProvider, error) {
	if url == "" {
		return nil, NoURLProvidedError
	}

	if branch == "" || path == "" {
		return nil, NoPathProvidedError
	}

	gp := GitProvider{URL: url, Path: path, Branch: branch}
	if err := gp.Clone(); err != nil {
		return nil, err
	}

	return &gp, nil
}

// Returs true if the repo was updated remotely, false otherwise
func (g *GitProvider) Pull() (error, bool) {
	g.mu.Lock()
	defer g.mu.Unlock()

	branch := plumbing.NewBranchReferenceName(g.Branch)
	repo, err := git.PlainOpen(g.Path)
	if err != nil {
		return err, false
	}

	wt, err := repo.Worktree()
	if err != nil {
		return err, false
	}

	if err := wt.Pull(&git.PullOptions{
		RemoteName:    "origin",
		ReferenceName: branch,
		Progress:      os.Stdout,
	}); err != nil {
		if err == git.NoErrAlreadyUpToDate {
			return nil, false
		}
		return err, false
	}
	defer wt.Clean(&git.CleanOptions{Dir: true})

	oldCommit := g.Commit
	if err := g.setValues(repo); err != nil {
		return err, false
	}

	if oldCommit == g.Commit {
		return nil, false
	}

	return nil, true
}

func (g *GitProvider) Clone() error {
	if g.URL == "" {
		return NoURLProvidedError
	}

	g.mu.Lock()
	defer g.mu.Unlock()

	branch := plumbing.NewBranchReferenceName(g.Branch)

	repo, err := git.PlainClone(g.Path, false, &git.CloneOptions{
		URL:      g.URL,
		Progress: os.Stdout,
	})

	if err != nil {
		return err
	}

	wt, err := repo.Worktree()
	if err != nil {
		return err
	}
	defer wt.Clean(&git.CleanOptions{Dir: true})

	if err := wt.Checkout(&git.CheckoutOptions{
		Branch: branch,
		Force:  true,
	}); err != nil {
		return err
	}

	return g.setValues(repo)
}

// Implement String Interface
func (g *GitProvider) String() string {
	return fmt.Sprintf("GitProvider\nURL: %s\nPath: %s\nBranch: %s\nCommit: %s\nDate: %s\n", g.URL, g.Path, g.Branch, g.Commit, g.Date)
}

func (g *GitProvider) setValues(repo *git.Repository) error {
	log, err := repo.Log(&git.LogOptions{})
	if err != nil {
		return err
	}
	defer log.Close()

	commit, err := log.Next()
	if err != nil {
		return err
	}

	g.Commit = commit.Hash.String()
	g.Date = commit.Author.When

	return nil
}

func (g *GitProvider) Read() error {
	g.mu.Lock()
	defer g.mu.Unlock()

	repo, err := git.PlainOpen(g.Path)
	if err != nil {
		return err
	}

	if err := g.ValidateBranch(repo); err != nil {
		branch := plumbing.NewBranchReferenceName(g.Branch)
		wt, err := repo.Worktree()
		if err != nil {
			return err
		}
		defer wt.Clean(&git.CleanOptions{Dir: true})

		if err := wt.Checkout(&git.CheckoutOptions{
			Branch: branch,
			Force:  true,
		}); err != nil {
			return err
		}

		if err := g.ValidateBranch(repo); err != nil {
			return err
		}
	}

	return g.setValues(repo)
}

func (g *GitProvider) Validate() error {
	repo, err := git.PlainOpen(g.Path)
	if err != nil {
		return err
	}

	if err := g.ValidateBranch(repo); err != nil {
		return err
	}

	if err := g.ValidateCommit(); err != nil {
		return err
	}

	return nil
}

func (g *GitProvider) ValidateBranch(repo *git.Repository) error {
	head, err := repo.Head()
	if err != nil {
		return err
	}

	cbranch := head.Name().Short()
	if cbranch != g.Branch {
		return InvalidBranchError
	}

	return nil
}

func (g *GitProvider) Wait() {
	g.mu.Lock()
	defer g.mu.Unlock()
}

func (g *GitProvider) ValidateCommit() error {
	if g.Commit == "" || g.Date.IsZero() {
		return InvalidStateError
	}
	return nil
}
