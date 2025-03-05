package xmlmodels

import "encoding/xml"

type Tradition struct {
	XMLName xml.Name `xml:"letterTradition"`
	Letter  int      `xml:"letter,attr"`
	Apps    []App    `xml:"app"`
}

type App struct {
	Reference int    `xml:"ref,attr"`
	Content   string `xml:",innerxml"`
}
