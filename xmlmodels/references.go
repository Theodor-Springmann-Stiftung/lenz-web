package xmlmodels

import "encoding/json"

type PersonDef struct {
	Index     int    `xml:"index,attr"`
	Name      string `xml:"name,attr"`
	Ref       string `xml:"ref,attr"`
	FirstName string `xml:"vorname,attr"`
	LastName  string `xml:"nachname,attr"`
	Comment   string `xml:"komm,attr"`
}

func (p PersonDef) Keys() []any {
	return []any{p.Index}
}

func (p PersonDef) Type() string {
	return PERSONREF
}

func (p PersonDef) String() string {
	data, err := json.Marshal(p)
	if err != nil {
		return "Cant marshal to json, PersonDef: " + err.Error()
	}
	return string(data)
}

type LocationDef struct {
	Index int    `xml:"index,attr"`
	Name  string `xml:"name,attr"`
	Ref   string `xml:"ref,attr"`
}

func (l LocationDef) Keys() []any {
	return []any{l.Index}
}

func (l LocationDef) Type() string {
	return LOCATIONREF
}

func (l LocationDef) String() string {
	data, err := json.Marshal(l)
	if err != nil {
		return "Cant marshal to json, LocationDef: " + err.Error()
	}
	return string(data)
}

type AppDef struct {
	Index    int    `xml:"index,attr"`
	Name     string `xml:"name,attr"`
	Category string `xml:"category,attr"`
}

func (a AppDef) Keys() []any {
	return []any{a.Index}
}

func (a AppDef) Type() string {
	return APPREF
}

func (a AppDef) String() string {
	data, err := json.Marshal(a)
	if err != nil {
		return "Cant marshal to json, AppDef: " + err.Error()
	}
	return string(data)
}
