package xmlmodels

import xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"

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
