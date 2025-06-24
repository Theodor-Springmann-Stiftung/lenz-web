package xmlmodels

import "github.com/Theodor-Springmann-Stiftung/lenz-web/xmlparsing"

type RefElement struct {
	Reference int    `xml:"ref,attr"`
	Text      string `xml:",chardata"`
	Cert      string `xml:"cert,attr"`
}

type Date struct {
	When      xmlparsing.XSDDate `xml:"when,attr"`
	NotBefore xmlparsing.XSDDate `xml:"notBefore,attr"`
	NotAfter  xmlparsing.XSDDate `xml:"notAfter,attr"`
	From      xmlparsing.XSDDate `xml:"from,attr"`
	To        xmlparsing.XSDDate `xml:"to,attr"`
	Cert      string             `xml:"cert,attr"`
	Text      string             `xml:",chardata"`
}

func (d *Date) Sort() *xmlparsing.XSDDate {
	if d.NotBefore.Validate() {
		return &d.NotBefore
	}

	if d.NotAfter.Validate() {
		return &d.NotAfter
	}

	if d.To.Validate() {
		return &d.To
	}

	if d.When.Validate() {
		return &d.When
	}

	if d.From.Validate() {
		return &d.From
	}

	return nil
}
