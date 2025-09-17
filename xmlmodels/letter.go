package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
	"io"
	"strconv"
	"strings"
)

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

type Letter struct {
	XMLName xml.Name `xml:"letterText"`
	Letter  int
	Pages   []Page
	// TODO: we need to save meta information about the chardata,
	// but separately, since this array will be used for search
	CharData string
}

type Page struct {
	No        int
	Letter    int
	Sidenotes []Sidenote
	Hands     []int
	Tokens    []xml.Token
	TokenInfo []Token // Stack and index info for each token
}

type Sidenote struct {
	XMLName    xml.Name
	Position   SidenotePosition
	Page       int
	Annotation string
	Anchor     int
	Tokens     []xml.Token
	CharData   string
	TokenInfo  []Token // Stack and index info for each token
}

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

func (l Letter) Hands() []int {
	h := []int{}

	for _, page := range l.Pages {
		h = append(h, page.Hands...)
	}
	return h
}

type SidenotePosition uint8

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
	b := strings.Builder{}
	var c_page *Page = nil
	var stack []string // Track element stack

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

		switch t := tokenCopy.(type) {
		case xml.StartElement:
			switch t.Name.Local {
			case "page":
				if c_page != nil {
					lt.Pages = append(lt.Pages, *c_page)
				}

				c_page = &Page{
					Letter: lt.Letter,
				}

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
				if c_page == nil {
					d.Skip()
					continue
				}
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
					token := NewTokenFromXMLToken(tokenCopy, stack, len(c_page.Tokens)-1)
					c_page.TokenInfo = append(c_page.TokenInfo, token)
				}
				stack = append(stack, t.Name.Local)
			}

		case xml.CharData:
			b.WriteString(string(t))
			if c_page != nil {
				c_page.Tokens = append(c_page.Tokens, tokenCopy)
				token := NewTokenFromXMLToken(tokenCopy, stack, len(c_page.Tokens)-1)
				c_page.TokenInfo = append(c_page.TokenInfo, token)
			}

		case xml.EndElement:
			if len(stack) > 0 && stack[len(stack)-1] == t.Name.Local {
				stack = stack[:len(stack)-1]
			}

			if t.Name.Local == "letterText" {
				// Don't add letterText end element to page tokens
				// Only save page if it has actual content
				if c_page != nil && len(c_page.Tokens) > 0 {
					lt.Pages = append(lt.Pages, *c_page)
				}
				lt.CharData = b.String()
				return nil
			}

			if c_page != nil {
				c_page.Tokens = append(c_page.Tokens, tokenCopy)
				token := NewTokenFromXMLToken(tokenCopy, stack, len(c_page.Tokens)-1)
				c_page.TokenInfo = append(c_page.TokenInfo, token)
			}
		}
	}

	return nil
}

func (s *Sidenote) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	b := strings.Builder{}
	s.XMLName = start.Name
	var stack []string // Track element stack within sidenote

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

	for {
		token, err := d.Token()
		if err != nil {
			return err
		}

		tokenCopy := xml.CopyToken(token)

		switch t := tokenCopy.(type) {
		case xml.StartElement:
			s.Tokens = append(s.Tokens, tokenCopy)
			token := NewTokenFromXMLToken(tokenCopy, stack, len(s.Tokens)-1)
			s.TokenInfo = append(s.TokenInfo, token)
			stack = append(stack, t.Name.Local)

		case xml.CharData:
			b.WriteString(string(t))
			s.Tokens = append(s.Tokens, tokenCopy)
			token := NewTokenFromXMLToken(tokenCopy, stack, len(s.Tokens)-1)
			s.TokenInfo = append(s.TokenInfo, token)

		case xml.EndElement:
			if len(stack) > 0 && stack[len(stack)-1] == t.Name.Local {
				stack = stack[:len(stack)-1]
			}

			if t.Name.Local == start.Name.Local {
				s.CharData = b.String()
				return nil
			}
			s.Tokens = append(s.Tokens, tokenCopy)
			token := NewTokenFromXMLToken(tokenCopy, stack, len(s.Tokens)-1)
			s.TokenInfo = append(s.TokenInfo, token)

		default:
			s.Tokens = append(s.Tokens, tokenCopy)
			token := NewTokenFromXMLToken(tokenCopy, stack, len(s.Tokens)-1)
			s.TokenInfo = append(s.TokenInfo, token)
		}
	}
}
