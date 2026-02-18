package xmlmodels

import gitpkg "github.com/Theodor-Springmann-Stiftung/lenz-web/git"

func Parse(dir string, commit *gitpkg.Commit) (*Library, error) {
	return NewLibrary(dir, commit)
}
