package xmlparsing

import (
	"iter"
	"sync"
)

// An XMLParser holds serialized XML data of a specific type.
type XMLParser[T IXMLItem] struct {
	// INFO: map is type map[string]*T
	Items sync.Map

	// INFO: Resolver is used to resolve references (back-links) between XML items.
	Resolver Resolver[T]

	mu sync.RWMutex
	// TODO: This array is meant to be for iteration purposes, since iteration over the sync.Map is slow.
	array []T
}

func NewXMLParser[T IXMLItem]() *XMLParser[T] {
	return &XMLParser[T]{Resolver: *NewResolver[T]()}
}

func (p *XMLParser[T]) Serialize(dataholder XMLRootElement[T], path string) error {
	if err := UnmarshalFile(path, dataholder); err != nil {
		return err
	}

	newItems := dataholder.Children()

	for _, item := range newItems {
		// INFO: Mostly it's just one ID, so the double loop is not that bad.
		for _, id := range item.Keys() {
			p.Items.Store(id, &item)
		}

		p.addResolvable(item)
	}

	p.mu.Lock()
	defer p.mu.Unlock()
	p.array = append(p.array, newItems...)
	return nil
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

func (p *XMLParser[T]) Item(id any) *T {
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
