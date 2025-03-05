package xmlmodels

import "encoding/xml"

type MetaRoot struct {
	XMLName xml.Name `xml:"opus"`
	Metas   []Meta   `xml:"letterDesc"`
}

func (m MetaRoot) Children() []Meta {
	return m.Metas
}

type DefinitionsRoot struct {
	XMLName     xml.Name     `xml:"definitions"`
	Persons     PersonDefs   `xml:"personDefs"`
	Locations   LocationDefs `xml:"locationDefs"`
	Apparatuses AppDefs      `xml:"appDefs"`
}

type PersonDefs struct {
	Persons []PersonDef `xml:"personDef"`
}

func (p PersonDefs) Children() []PersonDef {
	return p.Persons
}

type LocationDefs struct {
	Locations []LocationDef `xml:"locationDef"`
}

func (l LocationDefs) Children() []LocationDef {
	return l.Locations
}

type AppDefs struct {
	Apps []AppDef `xml:"appDef"`
}

func (a AppDefs) Children() []AppDef {
	return a.Apps
}

type TraditionsRoot struct {
	XMLName    xml.Name    `xml:"traditions"`
	Traditions []Tradition `xml:"tradition"`
}

func (t TraditionsRoot) Children() []Tradition {
	return t.Traditions
}

type DocumentsRoot struct {
	XMLName   xml.Name `xml:"document"`
	Documents []Letter `xml:"letterText"`
}

func (d DocumentsRoot) Children() []Letter {
	return d.Documents
}
