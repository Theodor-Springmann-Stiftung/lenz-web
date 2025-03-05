package xmlparsing

// INFO: This is used to resolve references (back-links) between XML items.

import (
	"fmt"
	"sync"
)

type Resolver[T IXMLItem] struct {
	// INFO: map[type][ID]
	index map[string]map[any][]Resolved[T]
	mu    sync.RWMutex
}

func NewResolver[T IXMLItem]() *Resolver[T] {
	return &Resolver[T]{index: make(map[string]map[any][]Resolved[T])}
}

func (r *Resolver[T]) Add(typeName, refID string, item Resolved[T]) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.index[typeName]; !exists {
		r.index[typeName] = make(map[any][]Resolved[T])
	}
	r.index[typeName][refID] = append(r.index[typeName][refID], item)
}

func (r *Resolver[T]) Get(typeName string, refID any) ([]Resolved[T], error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if typeIndex, exists := r.index[typeName]; exists {
		if items, ok := typeIndex[refID]; ok {
			return items, nil
		}
		return nil, fmt.Errorf("no references found for refID '%s' of type '%s'", refID, typeName)
	}
	return nil, fmt.Errorf("no index exists for type '%s'", typeName)
}

func (r *Resolver[T]) Clear() {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.index = make(map[string]map[any][]Resolved[T])
}
