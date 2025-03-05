package xmlmodels

import (
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

type Action struct {
	Dates   []Date       `xml:"date,attr"`
	Places  []RefElement `xml:"place"`
	Persons []RefElement `xml:"person"`
}
