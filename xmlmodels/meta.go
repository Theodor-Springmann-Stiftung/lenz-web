package xmlmodels

import (
	"encoding/json"
	"encoding/xml"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
)

type Meta struct {
	XMLName     xml.Name                `xml:"letterDesc"`
	Letter      int                     `xml:"letter,attr"`
	HasOriginal xmlparsing.OptionalBool `xml:"hasOriginal"`
	IsProofread xmlparsing.OptionalBool `xml:"isProofread"`
	IsDraft     xmlparsing.OptionalBool `xml:"isDraft"`
	Sent        []Action                `xml:"sent"`
	Recieved    []Action                `xml:"recieved"`
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

type Action struct {
	Dates   []Date       `xml:"date,attr"`
	Places  []RefElement `xml:"place"`
	Persons []RefElement `xml:"person"`
}
