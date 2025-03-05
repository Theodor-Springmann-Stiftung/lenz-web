package xmlparsing

import (
	"encoding/xml"
	"strings"
)

type OptionalBool int

const (
	Unspecified OptionalBool = iota
	True
	False
)

func (b *OptionalBool) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	var attr struct {
		Value string `xml:"value,attr"`
	}
	if err := d.DecodeElement(&attr, &start); err != nil {
		return err
	}

	switch strings.ToLower(attr.Value) {
	case "true":
		*b = True
	case "false":
		*b = False
	default:
		*b = Unspecified
	}
	return nil
}

func (b OptionalBool) MarshalXML(e *xml.Encoder, start xml.StartElement) error {
	if b == Unspecified {
		return nil
	}

	value := "false"
	if b == True {
		value = "true"
	}

	type alias struct {
		Value string `xml:"value,attr"`
	}
	return e.EncodeElement(alias{Value: value}, start)
}
