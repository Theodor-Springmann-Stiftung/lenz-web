package xmlmodels

import "encoding/xml"

type Letter struct {
	XMLName xml.Name     `xml:"letterText"`
	Letter  int          `xml:"letter,attr"`
	Pages   []Page       `xml:"page"`
	Hands   []RefElement `xml:"hand"`
	Content string       `xml:",innerxml"`
}

type Page struct {
	XMLName xml.Name `xml:"page"`
	Index   int      `xml:"index,attr"`
}
