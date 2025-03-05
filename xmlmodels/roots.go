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

type LocationDefs struct {
	Locations []LocationDef `xml:"locationDef"`
}

type AppDefs struct {
	Apps []AppDef `xml:"appDef"`
}

type TraditionsRoot struct {
	XMLName    xml.Name    `xml:"traditions"`
	Traditions []Tradition `xml:"tradition"`
}

type DocumentsRoot struct {
	XMLName   xml.Name `xml:"document"`
	Documents []Letter `xml:"letterText"`
}
