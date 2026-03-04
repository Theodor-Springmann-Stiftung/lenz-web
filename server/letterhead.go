package server

import (
	"strconv"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
)

type letterHeadModel struct {
	Number      int
	DateText    string
	IsDraft     bool
	HasOriginal bool
	Pairs       []letterHeadPairModel
}

type letterHeadPairModel struct {
	Sent     string
	Received string
}

func buildLetterHead(lib *xmlmodels.Library, meta *xmlmodels.Meta) letterHeadModel {
	head := letterHeadModel{
		Pairs: make([]letterHeadPairModel, 0),
	}
	if meta == nil {
		return head
	}

	head.Number = meta.Letter
	head.IsDraft = meta.IsDraft.IsTrue()
	head.HasOriginal = meta.HasOriginal.IsTrue()

	if earliest := meta.Earliest(); earliest != nil {
		head.DateText = strings.TrimSpace(earliest.Text)
	}

	for _, pair := range meta.SendReceivedPairs() {
		sentNames := resolveNames(lib, pair.Sent.Persons, true)

		receivedText := "Unbekannt"
		if pair.Received != nil {
			receivedNames := resolveNames(lib, pair.Received.Persons, true)
			receivedPlaces := resolveNames(lib, pair.Received.Places, false)

			if len(receivedNames) > 0 {
				receivedText = joinGerman(receivedNames)
			} else if len(receivedPlaces) > 0 {
				receivedText = joinGerman(receivedPlaces)
			} else {
				receivedText = ""
			}

			if len(receivedPlaces) > 0 && len(receivedNames) > 0 {
				receivedText += " (" + joinGerman(receivedPlaces) + ")"
			}
		}

		head.Pairs = append(head.Pairs, letterHeadPairModel{
			Sent:     joinGerman(sentNames),
			Received: receivedText,
		})
	}

	return head
}

func resolveNames(lib *xmlmodels.Library, refs []xmlmodels.RefElement, person bool) []string {
	ret := make([]string, 0, len(refs))
	for _, ref := range refs {
		name := ""
		if person {
			if def := lib.Person(ref.Reference); def != nil {
				name = strings.TrimSpace(def.Name)
				if name == "" {
					name = strings.TrimSpace(def.FirstName + " " + def.LastName)
				}
			}
		} else {
			if def := lib.Place(ref.Reference); def != nil {
				name = strings.TrimSpace(def.Name)
			}
		}

		if name == "" {
			name = strings.TrimSpace(ref.Text)
		}
		if name == "" && ref.Reference > 0 {
			if person {
				name = "Person " + strconv.Itoa(ref.Reference)
			} else {
				name = "Ort " + strconv.Itoa(ref.Reference)
			}
		}
		if name != "" {
			ret = append(ret, name)
		}
	}
	return ret
}

func joinGerman(items []string) string {
	switch len(items) {
	case 0:
		return ""
	case 1:
		return items[0]
	case 2:
		return items[0] + " und " + items[1]
	default:
		return strings.Join(items[:len(items)-1], ", ") + " und " + items[len(items)-1]
	}
}
