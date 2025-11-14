package xmlmodels

import (
	"encoding/json"
	"encoding/xml"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlparsing"
)

type Letter struct {
	XMLName xml.Name                                            `xml:"letterText"`
	Letter  int                                                 `xml:"letter,attr"`
	Pages   []Page                                              `xml:"page"`
	Hands   []RefElement                                        `xml:"hand"`
	HTML    xmlparsing.Parsed[LenzTextHandler, *LenzParseState] `xml:"-"`
}

func (l *Letter) UnmarshalXML(dec *xml.Decoder, start xml.StartElement) error {
	type alias struct {
		XMLName xml.Name     `xml:"letterText"`
		Letter  int          `xml:"letter,attr"`
		Pages   []Page       `xml:"page"`
		Hands   []RefElement `xml:"hand"`
		Inner   string       `xml:",innerxml"`
	}

	var data alias
	if err := dec.DecodeElement(&data, &start); err != nil {
		return err
	}

	l.XMLName = data.XMLName
	l.Letter = data.Letter
	l.Pages = data.Pages
	l.Hands = data.Hands

	parsed, err := parseText(Get(), data.Inner)
	if err != nil {
		return err
	}
	l.HTML = parsed

	return nil
}

func (l Letter) Keys() []any {
	return []any{l.Letter}
}

func (l Letter) Type() string {
	return LETTER
}

func (l Letter) String() string {
	json, err := json.Marshal(l)
	if err != nil {
		return "Cant marshal to json, Letter: " + err.Error()
	}
	return string(json)
}

type Page struct {
	XMLName xml.Name `xml:"page"`
	Index   int      `xml:"index,attr"`
}
