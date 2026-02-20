package xmlmodels

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"strconv"
)

type Letter struct {
	XMLName xml.Name `xml:"letterText"`
	Letter  int      `xml:"letter,attr"`
	Hands   []int    `xml:"-"`
	Data    []Page
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

// NOTE: parseSidenote und unten UnmarshalXML sind die beiden haupstächlichen Kontexte, in denen Text gehalten wird.
// Wir unterteilen Briefe in Brief - Seite - Zeilen und Sidenotes in Sidenote - Zeilen (weil eine Sidenote nicht über
// mehrere Seiten gehen kann).

// NOTE: Zeilen sind geschlossene Einheiten, die auch als HTML einen selbstständigen Block bilden können. Dazu werden
// in parseBlockLines synthetisch Elemente entweder am Anfang oder Ende der Zeile hinzugefügt, um einen offenen Stack
// zu schließen oder den Stack der vorhergehenden Zeile wieder zu öffnen, weil die Auszeichnugen fortgehen.

// NOTE: Wichtige synthetische Tags:
//   - Am Beginn oder Ende einer Zeile, wenn der Kontext in der XML über die Zeilen geöffnet bleibt (Token.Synth = true)
//   - Am Beginn von letterText und Sidenote kann eine synthetische erste Zeile eingefügt sein (Line.Type = First)
//   - Am Beginn einer Seite kann eine eine Zeile eingefügt sein, wenn der Kontext beispielsweise eines offenen
//     Absatzes über die Seitengrenze fortgeführt wird (Line.Type = Continuation)

// NOTE: Whitespace-Handling
// - Als Whitespace gilt hier nur ASCII-Whitespace, also TAB, LF, CR, SPACE. Alles andere kann semantisch bedeutsam sein.
// - Am Anfang von letterText, Sidenote oder Page: alle Whitespace-Token werden ignoriert, bis Text kommt
// - Am Anfang und Ende von Zeilen: alle Whitespace-Token werden ignoriert, bis Text bzw. die neue Zeile kommt.
func parseSidenote(dec *xml.Decoder, se xml.StartElement) (Sidenote, int, error) {
	var sn Sidenote
	pageNum := 0

	for _, a := range se.Attr {
		switch a.Name.Local {
		case "pos":
			sn.Position = a.Value
		case "annotation":
			sn.Annotation = a.Value
		case "page":
			if n, err := strconv.Atoi(trimASCIISpace(a.Value)); err == nil {
				pageNum = n
			}
		}
	}

	lines, err := parseBlockLines(dec, "sidenote")
	if err != nil {
		return sn, pageNum, err
	}
	sn.Lines = lines
	return sn, pageNum, nil
}

func (l *Letter) UnmarshalXML(dec *xml.Decoder, start xml.StartElement) error {
	// INFO: Brifnummer extrahieren, main Loop below
	for _, a := range start.Attr {
		if a.Name.Local == "letter" {
			n, err := strconv.Atoi(trimASCIISpace(a.Value))
			if err != nil {
				return fmt.Errorf("letterText@letter: %w", err)
			}
			l.Letter = n
			break
		}
	}

	var (
		pages   []Page
		curPage *Page
	)

	ensurePage := func(num int) *Page {
		for i := range pages {
			if pages[i].Number == num {
				return &pages[i]
			}
		}
		pages = append(pages, Page{Number: num})
		return &pages[len(pages)-1]
	}

	acc := newLineAccumulator(First, func(line Line) {
		if curPage == nil {
			curPage = ensurePage(1)
		}
		curPage.Lines = append(curPage.Lines, line)
	})

	handlePage := func(se xml.StartElement) error {
		idx := 1
		for _, a := range se.Attr {
			if a.Name.Local == "index" {
				n, err := strconv.Atoi(trimASCIISpace(a.Value))
				if err != nil {
					return fmt.Errorf("page@index: %w", err)
				}
				if n > 0 {
					idx = n
				}
				break
			}
		}
		if acc.curLine != nil {
			acc.closeLine()
		}
		curPage = ensurePage(idx)
		if acc.hasAnyLine {
			acc.setImplicitType(Continuation)
		} else {
			acc.setImplicitType(First)
		}
		return nil
	}

	// INFO: Main Loop
	for {
		tok, err := dec.Token()
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		switch t := tok.(type) {

		case xml.StartElement:
			name := t.Name.Local

			if isTransparentWrapper(name) {
				continue
			}

			switch name {
			case "page":
				if err := handlePage(t); err != nil {
					return err
				}
				continue
			case "line":
				acc.handleLineMarker(t)
				continue
			case "sidenote":
				sn, pageNum, err := parseSidenote(dec, t)
				if err != nil {
					return err
				}
				if pageNum == 0 {
					if curPage != nil {
						pageNum = curPage.Number
					} else {
						pageNum = 1
					}
				}
				p := ensurePage(pageNum)
				p.Sidenotes = append(p.Sidenotes, sn)
				continue
			}

			acc.appendStart(name, attrsToMap(t.Attr))

		case xml.EndElement:
			name := t.Name.Local

			if isTransparentWrapper(name) {
				continue
			}

			// INFO: Exit-Bedingung
			if name == start.Name.Local {
				if acc.curLine != nil {
					acc.closeLine()
				}
				l.Data = pages
				return nil
			}

			// INFO: Selbst-schließende tags werden vom Go-Parser expandiert, deswegen:
			if name == "page" || name == "line" {
				continue
			}

			acc.appendEnd(name)

		case xml.CharData:
			s := string([]byte(t))
			if isOnlyASCIISpace(s) {
				if acc.isAtLineStart() {
					continue
				}
				s = " "
			}
			acc.appendText(s)
		}
	}

	l.Data = pages
	return nil
}
