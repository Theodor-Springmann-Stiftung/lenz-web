package xmlmodels

type PersonDef struct {
	Index     int    `xml:"index,attr"`
	Name      string `xml:"name,attr"`
	Ref       string `xml:"ref,attr"`
	FirstName string `xml:"vorname,attr"`
	LastName  string `xml:"nachname,attr"`
	Comment   string `xml:"komm,attr"`
}

type LocationDef struct {
	Index int    `xml:"index,attr"`
	Name  string `xml:"name,attr"`
	Ref   string `xml:"ref,attr"`
}

type AppDef struct {
	Index    int    `xml:"index,attr"`
	Name     string `xml:"name,attr"`
	Category string `xml:"category,attr"`
}
