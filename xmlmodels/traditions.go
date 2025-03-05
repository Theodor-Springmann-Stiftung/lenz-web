package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
)

type Tradition struct {
	XMLName xml.Name `xml:"letterTradition"`
	Letter  int      `xml:"letter,attr"`
	Apps    []App    `xml:"app"`
}

func (t Tradition) Keys() []any {
	return []any{t.Letter}
}

func (t Tradition) Type() string {
	return TRADITION
}

func (t Tradition) String() string {
	data, err := json.Marshal(t)
	if err != nil {
		return "Cant marshal to json, Tradition: " + err.Error()
	}
	return string(data)
}

type App struct {
	Reference int    `xml:"ref,attr"`
	Content   string `xml:",innerxml"`
}
