package xmlparsing

import (
	"iter"
	"slices"
	"sync"
	"time"
)

type ParseSource int

const (
	SourceUnknown ParseSource = iota
	Path
	Commit
)

type ParseMeta struct {
	Source  ParseSource
	BaseDir string
	Commit  string
	Date    time.Time

	FailedPaths []string
}

func (p ParseMeta) Equals(other ParseMeta) bool {
	return p.Source == other.Source && p.BaseDir == other.BaseDir && p.Commit == other.Commit && p.Date == other.Date
}

func (p ParseMeta) Failed(path string) bool {
	return slices.Contains(p.FailedPaths, path)
}

// An XMLParser is a struct that holds holds serialized XML data of a specific type. It combines multiple parses IF a succeeded parse can not serialize the data from a path.
type XMLParser[T IXMLItem] struct {
	// INFO: map is type map[string]*T
	Items sync.Map
	// INFO: map is type [string]ItemInfo
	Infos sync.Map

	// INFO: Resolver is used to resolve references (back-links) between XML items.
	Resolver Resolver[T]

	mu sync.RWMutex
	// TODO: This array is meant to be for iteration purposes, since iteration over the sync.Map is slow.
	array []T
}

func NewXMLParser[T IXMLItem]() *XMLParser[T] {
	return &XMLParser[T]{Resolver: *NewResolver[T]()}
}

// INFO: To parse sth, we call Prepare, then Serialize, then Cleanup.
// Prepare & Cleanup are called once per parse. Serialize is called for every path.
// and can be called concurretly.
func (p *XMLParser[T]) Prepare() {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.array = make([]T, 0, len(p.array))
	p.Resolver.Clear()
}

func (p *XMLParser[T]) Serialize(dataholder XMLRootElement[T], path string, latest ParseMeta) error {
	if err := UnmarshalFile(path, dataholder); err != nil {
		return err
	}

	newItems := dataholder.Children()

	for _, item := range newItems {
		// INFO: Mostly it's just one ID, so the double loop is not that bad.
		for _, id := range item.Keys() {
			p.Infos.Store(id, ItemInfo{Source: path, Parse: latest})
			p.Items.Store(id, &item)
		}

		p.addResolvable(item)
	}

	p.mu.Lock()
	defer p.mu.Unlock()
	p.array = append(p.array, newItems...)
	return nil
}

// INFO: Cleanup is called after all paths have been serialized.
// It deletes all items that have not been parsed in the last commit,
// and whose filepath has not been marked as failed.
func (p *XMLParser[T]) Cleanup(latest ParseMeta) {
	todelete := make([]string, 0)
	toappend := make([]*T, 0)
	p.Infos.Range(func(key, value interface{}) bool {
		info := value.(ItemInfo)
		if !info.Parse.Equals(latest) {
			if !latest.Failed(info.Source) {
				todelete = append(todelete, key.(string))
			} else {
				item, ok := p.Items.Load(key)
				if ok {
					i := item.(*T)
					if !slices.Contains(toappend, i) {
						toappend = append(toappend, i)
					}
				}
			}
		}
		return true
	})

	for _, key := range todelete {
		p.Infos.Delete(key)
		p.Items.Delete(key)
	}

	p.mu.Lock()
	defer p.mu.Unlock()
	for _, item := range toappend {
		p.array = append(p.array, *item)
		p.addResolvable(*item)
	}
}

func (p *XMLParser[T]) addResolvable(item T) {
	// INFO: If the item has a GetReferences method, we add the references to the resolver.
	if rr, ok := any(item).(ReferenceResolver[T]); ok {
		for name, ids := range rr.References() {
			for _, res := range ids {
				res.Item = &item
				p.Resolver.Add(name, res.Reference, res)
			}
		}
	}
}

func (p *XMLParser[T]) ReverseLookup(item IXMLItem) (ret []Resolved[T]) {
	// INFO: this runs just once for the first key
	keys := item.Keys()

	for _, key := range keys {
		r, err := p.Resolver.Get(item.Type(), key)
		if err == nil {
			ret = append(ret, r...)
		}
	}

	return
}

func (a *XMLParser[T]) String() (s string) {
	a.RLock()
	defer a.RUnlock()
	for _, item := range a.array {
		s += item.String()
	}
	return
}

func (p *XMLParser[T]) Info(id string) ItemInfo {
	info, ok := p.Infos.Load(id)
	if !ok {
		return ItemInfo{}
	}
	return info.(ItemInfo)
}

func (p *XMLParser[T]) Item(id string) *T {
	item, ok := p.Items.Load(id)
	if !ok {
		return nil
	}

	i := item.(*T)
	return i
}

func (p *XMLParser[T]) Filter(f func(T) bool) iter.Seq[T] {
	return func(yield func(T) bool) {
		p.mu.RLock()
		defer p.mu.RUnlock()
		for _, v := range p.array {
			if f(v) && !yield(v) {
				return
			}
		}
	}
}

func (p *XMLParser[T]) Iterate() iter.Seq[T] {
	return func(yield func(T) bool) {
		p.mu.RLock()
		defer p.mu.RUnlock()
		for _, v := range p.array {
			if !yield(v) {
				return
			}
		}
	}
}

func (p *XMLParser[T]) Count() int {
	p.RLock()
	defer p.RUnlock()
	return len(p.array)
}

// INFO: These are reading locks.
func (p *XMLParser[T]) RLock() {
	p.mu.RLock()
}

func (p *XMLParser[T]) RUnlock() {
	p.mu.RUnlock()
}
