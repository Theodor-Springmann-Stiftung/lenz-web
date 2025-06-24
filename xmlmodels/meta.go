package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
	"iter"
	"slices"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlparsing"
)

type Meta struct {
	XMLName     xml.Name                `xml:"letterDesc"`
	Letter      int                     `xml:"letter,attr"`
	HasOriginal xmlparsing.OptionalBool `xml:"hasOriginal"`
	IsProofread xmlparsing.OptionalBool `xml:"isProofread"`
	IsDraft     xmlparsing.OptionalBool `xml:"isDraft"`
	Sent        []Action                `xml:"sent"`
	Recieved    []Action                `xml:"received"`
}

func (m *Meta) Earliest() *Date {
	var earliest *Date

	for _, action := range m.Sent {
		if earliest == nil || action.Earliest().Sort().Before(*earliest.Sort()) {
			earliest = action.Earliest()
		}
	}

	if earliest != nil {
		return earliest
	}

	for _, action := range m.Recieved {
		if earliest == nil || action.Earliest().Sort().Before(*earliest.Sort()) {
			earliest = action.Earliest()
		}
	}

	return earliest
}

func (m Meta) Keys() []any {
	return []any{m.Letter}
}

func (m Meta) Type() string {
	return META
}

func (m Meta) String() string {
	json, err := json.Marshal(m)
	if err != nil {
		return "Cant marshal to json, Meta: " + err.Error()
	}
	return string(json)
}

type SendRecievedPair struct {
	Sent     *Action
	Received *Action
}

func (m Meta) SendReceivedPairs() []SendRecievedPair {
	return slices.Collect(m.SendRecieved())
}

func (m Meta) SendRecieved() iter.Seq[SendRecievedPair] {
	return func(yield func(SendRecievedPair) bool) {
		for i, sent := range m.Sent {
			var rec *Action
			if i < len(m.Recieved) {
				rec = &m.Recieved[i]
			}
			if !yield(SendRecievedPair{Sent: &sent, Received: rec}) {
				return
			}
		}
	}
}

type Action struct {
	Dates   []Date       `xml:"date"`
	Places  []RefElement `xml:"location"`
	Persons []RefElement `xml:"person"`
}

func (a *Action) Earliest() *Date {
	if len(a.Dates) == 0 {
		return nil
	}

	return &a.Dates[0]
}
