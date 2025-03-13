package xmlmodels

import "encoding/xml"

type MetaRoot struct {
	XMLName xml.Name `xml:"opus"`
	Metas   []Meta   `xml:"descriptions>letterDesc"`
}

func (m MetaRoot) Children() []Meta {
	return m.Metas
}

type PersonDefs struct {
	xml.Name `xml:"opus"`
	Persons  []PersonDef `xml:"definitions>personDefs>personDef"`
}

func (p PersonDefs) Children() []PersonDef {
	return p.Persons
}

type LocationDefs struct {
	xml.Name  `xml:"opus"`
	Locations []LocationDef `xml:"definitions>locationDefs>locationDef"`
}

func (l LocationDefs) Children() []LocationDef {
	return l.Locations
}

type AppDefs struct {
	xml.Name `xml:"opus"`
	Apps     []AppDef `xml:"definitions>appDefs>appDef"`
}

func (a AppDefs) Children() []AppDef {
	return a.Apps
}

type TraditionsRoot struct {
	xml.Name   `xml:"opus"`
	Traditions []Tradition `xml:"traditions>letterTradition"`
}

func (t TraditionsRoot) Children() []Tradition {
	return t.Traditions
}

type DocumentsRoot struct {
	xml.Name `xml:"opus"`
	Document []Letter `xml:"document>letterText"`
}

func (d DocumentsRoot) Children() []Letter {
	return d.Document
}
