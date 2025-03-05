package xmlmodels

import (
	"fmt"
	"path/filepath"
	"strings"
	"sync"
	"time"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
)

const (
	REFERENCES_PATH = "data/xml/akteure.xml"
	LETTERS_PATH    = "data/xml/briefe.xml"
	META_PATH       = "data/xml/meta.xml"
	TRADITIONS_PATH = "data/xml/traditions.xml"
)

type Library struct {
	mu sync.Mutex
	xmlparsing.Library

	Persons *xmlparsing.XMLParser[PersonDef]
	Places  *xmlparsing.XMLParser[LocationDef]
	AppDefs *xmlparsing.XMLParser[AppDef]

	Letters    *xmlparsing.XMLParser[Letter]
	Traditions *xmlparsing.XMLParser[Tradition]
	Metas      *xmlparsing.XMLParser[Meta]
}

func (l *Library) String() string {
	// TODO:
	return ""
}

// INFO: this is the only place where the providers are created. There is no need for locking on access.
func NewLibrary() *Library {
	return &Library{
		Persons:    xmlparsing.NewXMLParser[PersonDef](),
		Places:     xmlparsing.NewXMLParser[LocationDef](),
		AppDefs:    xmlparsing.NewXMLParser[AppDef](),
		Letters:    xmlparsing.NewXMLParser[Letter](),
		Traditions: xmlparsing.NewXMLParser[Tradition](),
		Metas:      xmlparsing.NewXMLParser[Meta](),
	}
}

func (l *Library) Parse(source xmlparsing.ParseSource, baseDir, commit string) error {
	// INFO: this lock prevents multiple parses from happening at the same time.
	l.mu.Lock()
	defer l.mu.Unlock()

	wg := sync.WaitGroup{}
	meta := xmlparsing.ParseMeta{
		Source:  source,
		BaseDir: baseDir,
		Commit:  commit,
		Date:    time.Now(),
	}
	metamu := sync.Mutex{}

	l.prepare()

	wg.Add(1)
	go func() {
		err := l.Persons.Serialize(&PersonDefs{}, filepath.Join(meta.BaseDir, REFERENCES_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, REFERENCES_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		err := l.Places.Serialize(&LocationDefs{}, filepath.Join(meta.BaseDir, REFERENCES_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, REFERENCES_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		err := l.AppDefs.Serialize(&AppDefs{}, filepath.Join(meta.BaseDir, REFERENCES_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, REFERENCES_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		err := l.Letters.Serialize(&DocumentsRoot{}, filepath.Join(meta.BaseDir, LETTERS_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, LETTERS_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		err := l.Traditions.Serialize(&TraditionsRoot{}, filepath.Join(meta.BaseDir, TRADITIONS_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, TRADITIONS_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		err := l.Metas.Serialize(&MetaRoot{}, filepath.Join(meta.BaseDir, META_PATH), meta)
		if err != nil {
			metamu.Lock()
			meta.FailedPaths = append(meta.FailedPaths, filepath.Join(meta.BaseDir, META_PATH))
			metamu.Unlock()
		}
		wg.Done()
	}()

	wg.Wait()

	l.cleanup(meta)
	l.Parses = append(l.Parses, meta)

	var errors []string
	if len(meta.FailedPaths) > 0 {
		errors = append(errors, fmt.Sprintf("Failed paths: %v", meta.FailedPaths))
	}
	if len(errors) > 0 {
		return fmt.Errorf("Parsing encountered errors: %v", strings.Join(errors, "; "))
	}
	return nil
}

func (l *Library) prepare() {
	l.Persons.Prepare()
	l.Places.Prepare()
	l.AppDefs.Prepare()
	l.Letters.Prepare()
	l.Traditions.Prepare()
	l.Metas.Prepare()
}

func (l *Library) cleanup(meta xmlparsing.ParseMeta) {
	wg := sync.WaitGroup{}
	wg.Add(6)

	go func() {
		l.Persons.Cleanup(meta)
		wg.Done()
	}()

	go func() {
		l.Places.Cleanup(meta)
		wg.Done()
	}()

	go func() {
		l.AppDefs.Cleanup(meta)
		wg.Done()
	}()

	go func() {
		l.Letters.Cleanup(meta)
		wg.Done()
	}()

	go func() {
		l.Traditions.Cleanup(meta)
		wg.Done()
	}()

	go func() {
		l.Metas.Cleanup(meta)
		wg.Done()
	}()

	wg.Wait()
}
