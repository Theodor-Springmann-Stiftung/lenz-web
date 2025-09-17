package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
)

type Letter struct {
	XMLName  xml.Name     `xml:"letterText"`
	Letter   int          `xml:"letter,attr"`
	Pages    []Page       `xml:"page"`
	Hands    []RefElement `xml:"hand"`
	Content  string       `xml:",innerxml"`
	Chardata string       `xml:",chardata"`
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
