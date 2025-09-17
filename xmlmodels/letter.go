package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
	"io"
	"strconv"
)

func (l Letter) Keys() []any {
	return []any{l.Letter}
}

func (l Letter) Type() string {
	return LETTER
}

func (l Letter) String() string {
	json, err := json.Marshal(l)
	if err != nil {
		return "Cant marshal to json, Letter: " + err.Error()
	}
	return string(json)
}

type SidenotePosition uint8

const (
	SidenotePositionLeft SidenotePosition = iota
	SidenotePositionRight
	SidenotePositionTop
	SidenotePositionTopLeft
	SidenotePositionTopRight
	SidenotePositionBottom
	SidenotePositionBottomLeft
	SidenotePositionBottomRight
)

func (sp *SidenotePosition) UnmarshalXMLAttr(attr xml.Attr) error {
	switch attr.Value {
	case "left":
		*sp = SidenotePositionLeft
	case "right":
		*sp = SidenotePositionRight
	case "top":
		*sp = SidenotePositionTop
	case "top left":
		*sp = SidenotePositionTopLeft
	case "top right":
		*sp = SidenotePositionTopRight
	case "bottom":
		*sp = SidenotePositionBottom
	case "bottom left":
		*sp = SidenotePositionBottomLeft
	case "bottom right":
		*sp = SidenotePositionBottomRight
	default:
		*sp = SidenotePositionLeft // Default fallback
	}
	return nil
}

type Letter struct {
	XMLName xml.Name `xml:"letterText"`
	Letter  int
	Pages   []Page
}

type Page struct {
	No        int
	Letter    int
	Sidenotes []Sidenote
	Hands     []int
	Tokens    []xml.Token
	CharData  string
}

type Sidenote struct {
	XMLName    xml.Name
	Position   SidenotePosition
	Page       int
	Annotation string
	Anchor     int
	Tokens     []xml.Token
	CharData   string
}

type Char struct {
	Stack []xml.Token
	Value string
}

func (c Char) String() string {
	return c.Value
}

func (lt *Letter) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	lt.XMLName = start.Name
	for _, attr := range start.Attr {
		if attr.Name.Local == "letter" {
			if letterNum, err := strconv.Atoi(attr.Value); err == nil {
				lt.Letter = letterNum
			}
		}
	}

	if err := lt.parseTokens(d); err != nil {
		return err
	}

	return nil
}

func (lt *Letter) parseTokens(d *xml.Decoder) error {
	stack := []xml.Token{}
	var c_page *Page = nil

	for {
		token, err := d.Token()
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		// INFO: Make a copy of the token since Token() reuses the underlying data
		tokenCopy := xml.CopyToken(token)
		if c_page != nil {
			c_page.Tokens = append(c_page.Tokens, tokenCopy)
		}

		switch t := tokenCopy.(type) {
		case xml.StartElement:
			switch t.Name.Local {
			case "page":
				if c_page != nil {
					lt.Pages = append(lt.Pages, *c_page)
				}

				c_page = &Page{}

				for _, attr := range t.Attr {
					if attr.Name.Local == "index" {
						if idx, err := strconv.Atoi(attr.Value); err == nil {
							c_page.No = idx
						}
					}
				}

				d.Skip()

			// WARNING: UnmarshalXML continues and changes the state of the parser
			case "sidenote":
				var sidenote Sidenote = Sidenote{
					Anchor: len(c_page.Tokens),
				}
				if err := sidenote.UnmarshalXML(d, t); err == nil && c_page != nil {
					c_page.Sidenotes = append(c_page.Sidenotes, sidenote)
				}

			// INFO: We create a list of all hand in a letter
			case "hand":
				for _, attr := range t.Attr {
					if attr.Name.Local == "ref" && c_page != nil {
						if ref, err := strconv.Atoi(attr.Value); err == nil {
							c_page.Hands = append(c_page.Hands, ref)
						}
					}
				}
				fallthrough

			default:
				if c_page != nil {
					c_page.Tokens = append(c_page.Tokens, tokenCopy)
				}
			}

		case xml.CharData:
			if c_page != nil {
				c_page.CharData = string(t)
				c_page.Tokens = append(c_page.Tokens, tokenCopy)
			}

		case xml.EndElement:
			if t.Name.Local == "letterText" {
				if c_page != nil {
					lt.Pages = append(lt.Pages, *c_page)
				}
				return nil
			}

			if c_page != nil {
				c_page.Tokens = append(c_page.Tokens, tokenCopy)
			}
		}
	}

	return nil
}

func (s *Sidenote) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	// Set the XMLName
	s.XMLName = start.Name

	// Parse attributes
	for _, attr := range start.Attr {
		switch attr.Name.Local {
		case "pos":
			s.Position.UnmarshalXMLAttr(attr)
		case "page":
			if page, err := strconv.Atoi(attr.Value); err == nil {
				s.Page = page
			}
		case "annotation":
			s.Annotation = attr.Value
		}
	}

	// Collect all content tokens
	for {
		token, err := d.Token()
		if err != nil {
			return err
		}

		tokenCopy := xml.CopyToken(token)

		switch t := tokenCopy.(type) {
		case xml.EndElement:
			if t.Name.Local == start.Name.Local {
				// End of sidenote element
				return nil
			}
			// Add the end element token to content
			s.Content = append(s.Content, tokenCopy)
		case xml.StartElement, xml.CharData, xml.Comment, xml.ProcInst:
			// Add all other tokens to content
			s.Content = append(s.Content, tokenCopy)
		}
	}
}
