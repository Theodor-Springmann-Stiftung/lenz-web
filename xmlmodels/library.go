package xmlmodels

import (
	"fmt"
	"html/template"
	"log/slog"
	"maps"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlparsing"
)

const (
	REFERENCES_PATH = "data/xml/references.xml"
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

	cache sync.Map
}

func (l *Library) String() string {
	// TODO:
	sb := strings.Builder{}

	sb.WriteString("Persons: ")
	sb.WriteString(strconv.Itoa(l.Persons.Count()))
	sb.WriteString("\n")

	sb.WriteString("Places: ")
	sb.WriteString(strconv.Itoa(l.Places.Count()))
	sb.WriteString("\n")

	sb.WriteString("AppDefs: ")
	sb.WriteString(strconv.Itoa(l.AppDefs.Count()))
	sb.WriteString("\n")

	sb.WriteString("Letters: ")
	sb.WriteString(strconv.Itoa(l.Letters.Count()))
	filter := func(item Letter) bool {
		return len(item.Hands()) > 0
	}
	hands := 0
	for l := range l.Letters.Filter(filter) {
		hands += 1
		sb.WriteString("\n")
		sb.WriteString(strconv.Itoa(l.Letter) + ": ")
		sb.WriteString(strconv.Itoa(len(l.Hands())) + " Hände, No " + strconv.Itoa(hands))
	}
	sb.WriteString("\n")

	sb.WriteString("Traditions: ")
	sb.WriteString(strconv.Itoa(l.Traditions.Count()))
	sb.WriteString("\n")

	sb.WriteString("Metas: ")
	sb.WriteString(strconv.Itoa(l.Metas.Count()))
	sb.WriteString("\n")

	return sb.String()
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
	l.cache.Clear()

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
			slog.Error("Failed to serialize persons:", "error", err)
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
			slog.Error("Failed to serialize places:", "error", err)
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
			slog.Error("Failed to serialize appdefs:", "error", err)
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
			slog.Error("Failed to serialize letters:", "error", err)
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
			slog.Error("Failed to serialize traditions:", "error", err)
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
			slog.Error("Failed to serialize meta:", "error", err)
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

type NextPrev struct {
	Next, Prev *Meta
}

func (l *Library) NextPrev(meta *Meta) *NextPrev {
	year := meta.Earliest().Sort().Year
	years, yearmap := l.Years()
	var next, prev *Meta
	for i, y := range yearmap[year] {
		if y.Letter == meta.Letter {
			if i > 0 {
				prev = &yearmap[year][i-1]
			} else {
				index := slices.Index(years, year)
				if index > 0 {
					prev = &yearmap[years[index-1]][len(yearmap[years[index-1]])-1]
				}
			}
			if i < len(yearmap[year])-1 {
				next = &yearmap[year][i+1]
			} else {
				index := slices.Index(years, year)
				if index < len(years)-1 {
					next = &yearmap[years[index+1]][0]
				}
			}
			break
		}
	}

	return &NextPrev{Next: next, Prev: prev}
}

func (l *Library) Years() ([]int, map[int][]Meta) {
	if years, ok := l.cache.Load("years"); ok {
		if yearmap, ok := l.cache.Load("yearmap"); ok {
			return years.([]int), yearmap.(map[int][]Meta)
		}
	}

	mapYears := make(map[int][]Meta)
	for item := range l.Metas.Iterate() {
		earliest := item.Earliest()
		if earliest != nil {
			mapYears[earliest.Sort().Year] = append(mapYears[earliest.Sort().Year], item)
		}
	}

	ret := slices.Collect(maps.Keys(mapYears))
	slices.Sort(ret)

	for _, items := range mapYears {
		slices.SortFunc(items, func(a, b Meta) int {
			return a.Earliest().Sort().Compare(b.Earliest().Sort())
		})
	}
	l.cache.Store("years", ret)
	l.cache.Store("yearmap", mapYears)
	return ret, mapYears
}

func (l *Library) LettersForYear(year int) (ret []Meta) {
	for l := range l.Metas.Filter(func(item Meta) bool {
		return item.Earliest().Sort().Year == year
	}) {
		ret = append(ret, l)
	}
	return ret
}

func (l *Library) Person(id int) (ret *PersonDef) {
	ret = l.Persons.Item(id)
	return ret
}

func (l *Library) App(id int) (ret *AppDef) {
	ret = l.AppDefs.Item(id)
	return ret
}

func (l *Library) Place(id int) (ret *LocationDef) {
	ret = l.Places.Item(id)
	return ret
}

func (l *Library) Tradition(letter int) (ret []App) {
	item := l.Traditions.Item(letter)
	if item == nil {
		return []App{}
	}

	return item.Apps
}

func (l *Library) GetPersons(id []int) (ret []*PersonDef) {
	for _, i := range id {
		ret = append(ret, l.Person(i))
	}
	return ret
}

func (l *Library) GetPlaces(id []int) (ret []*LocationDef) {
	for _, i := range id {
		ret = append(ret, l.Place(i))
	}
	return ret
}

func (l *Library) FuncMap() template.FuncMap {
	return template.FuncMap{
		"Person":    l.Person,
		"Place":     l.Place,
		"Persons":   l.GetPersons,
		"Places":    l.GetPlaces,
		"App":       l.App,
		"Tradition": l.Tradition,
	}
}
