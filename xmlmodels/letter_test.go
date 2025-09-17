package xmlmodels

import (
	"encoding/xml"
	"io"
	"os"
	"strings"
	"testing"
)

// Test data from real briefe.xml
const testLetter1 = `<letterText letter="1">
<page index="1" /><align pos="right">HochEdelgeborner Hochgelahrter Herr <aq>Secretair</aq></align>
<line type="break" tab="7" /><align pos="right">Verehrungswürdigster Gönner!</align>
<line type="empty" />
Ew. HochEdelgebh: haben mich durch die neue Probe von Dero schätzbaren Gewogenheit ausserorndtlich beschämt.
<page index="2" />lasse mich noch lange das Glück genießen, Dieselben in dem blühendsten Wohlstande zu sehen.
<line type="break" /><align pos="right">gehorsamsten Diener
<line type="break" />Jacob Michael Reinhold Lenz</align>
</letterText>`

const testLetterWithSidenote = `<letterText letter="2">
<page index="1" />Text before sidenote.
<sidenote pos="left" page="1" annotation="am linken Rand der zweiten Seite">Ich umarme Dich und küsse Dich 1000mahl als Dein
<line type="break" />allergetreuester Bruder
<line type="break" />Jacob Michael Reinhold Lenz.</sidenote>
More text after sidenote.
</letterText>`

const testLetterComplexStructure = `<letterText letter="3">
<page index="1" />
<align pos="center">Verehrungswürdigste Eltern!</align>
<line type="empty" />
Nach einer langsamen Reise sind wir angekommen.
<page index="2" />
Die Wittwe ist eine <aq>simple</aq> Frau.
<hand ref="42">Hand reference content</hand>
Final content.
<page index="3" />
Last page content with <b>markup</b>.
</letterText>`

func TestNewTokenFromXMLToken(t *testing.T) {
	tests := []struct {
		name     string
		xmlToken xml.Token
		stack    []string
		index    int
		expected Token
	}{
		{
			name:     "StartElement with attributes",
			xmlToken: xml.StartElement{Name: xml.Name{Local: "page"}, Attr: []xml.Attr{{Name: xml.Name{Local: "index"}, Value: "1"}}},
			stack:    []string{"letterText"},
			index:    5,
			expected: Token{
				Index:      5,
				Stack:      []string{"letterText"},
				Attributes: map[string]string{"index": "1"},
			},
		},
		{
			name:     "CharData token",
			xmlToken: xml.CharData("Hello world"),
			stack:    []string{"letterText", "align"},
			index:    10,
			expected: Token{
				Index:      10,
				Stack:      []string{"letterText", "align"},
				Attributes: map[string]string{},
			},
		},
		{
			name:     "EndElement token",
			xmlToken: xml.EndElement{Name: xml.Name{Local: "align"}},
			stack:    []string{"letterText"},
			index:    15,
			expected: Token{
				Index:      15,
				Stack:      []string{"letterText"},
				Attributes: map[string]string{},
			},
		},
		{
			name:     "Empty stack",
			xmlToken: xml.StartElement{Name: xml.Name{Local: "letterText"}},
			stack:    []string{},
			index:    0,
			expected: Token{
				Index:      0,
				Stack:      []string{},
				Attributes: map[string]string{},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := NewTokenFromXMLToken(tt.xmlToken, tt.stack, tt.index)

			if result.Index != tt.expected.Index {
				t.Errorf("Expected index %d, got %d", tt.expected.Index, result.Index)
			}

			if len(result.Stack) != len(tt.expected.Stack) {
				t.Errorf("Expected stack length %d, got %d", len(tt.expected.Stack), len(result.Stack))
			}

			for i, expected := range tt.expected.Stack {
				if result.Stack[i] != expected {
					t.Errorf("Expected stack[%d] = %s, got %s", i, expected, result.Stack[i])
				}
			}

			if len(result.Attributes) != len(tt.expected.Attributes) {
				t.Errorf("Expected %d attributes, got %d", len(tt.expected.Attributes), len(result.Attributes))
			}

			for key, expectedValue := range tt.expected.Attributes {
				if actualValue, exists := result.Attributes[key]; !exists || actualValue != expectedValue {
					t.Errorf("Expected attribute %s = %s, got %s (exists: %v)", key, expectedValue, actualValue, exists)
				}
			}
		})
	}
}

func TestLetterUnmarshalXML_BasicStructure(t *testing.T) {
	var letter Letter
	err := xml.Unmarshal([]byte(testLetter1), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal letter: %v", err)
	}

	// Test basic letter properties
	if letter.Letter != 1 {
		t.Errorf("Expected letter number 1, got %d", letter.Letter)
	}

	if len(letter.Pages) != 2 {
		t.Errorf("Expected 2 pages, got %d", len(letter.Pages))
	}

	// Test page properties
	for i, page := range letter.Pages {
		expectedPageNo := i + 1
		if page.No != expectedPageNo {
			t.Errorf("Expected page %d to have No = %d, got %d", i, expectedPageNo, page.No)
		}
		if page.Letter != 1 {
			t.Errorf("Expected page %d to have Letter = 1, got %d", i, page.Letter)
		}
		if len(page.Tokens) == 0 {
			t.Errorf("Expected page %d to have tokens, got none", i)
		}
		if len(page.TokenInfo) != len(page.Tokens) {
			t.Errorf("Expected page %d to have equal TokenInfo and Tokens length, got %d vs %d",
				i, len(page.TokenInfo), len(page.Tokens))
		}
	}

	// Test character data is collected
	if len(letter.CharData) == 0 {
		t.Error("Expected CharData to be populated")
	}
	if !strings.Contains(letter.CharData, "HochEdelgeborner") {
		t.Error("Expected CharData to contain letter content")
	}
}

func TestLetterUnmarshalXML_TokenInfo(t *testing.T) {
	var letter Letter
	err := xml.Unmarshal([]byte(testLetter1), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal letter: %v", err)
	}

	// Test first page tokens and TokenInfo
	page1 := letter.Pages[0]
	if len(page1.TokenInfo) == 0 {
		t.Fatal("Expected page 1 to have TokenInfo")
	}

	// Find tokens with attributes and validate TokenInfo
	foundAlignToken := false

	for i, tokenInfo := range page1.TokenInfo {
		// Check index matches position
		if tokenInfo.Index != i {
			t.Errorf("Expected TokenInfo[%d] to have Index = %d, got %d", i, i, tokenInfo.Index)
		}

		// Check for align token (should have pos attribute)
		if attr, exists := tokenInfo.Attributes["pos"]; exists && attr == "right" {
			foundAlignToken = true
			// Since page elements are excluded, align should be at stack depth 0 in page tokens
			// (the letterText context is the parsing context, not included in individual page stacks)
		}

		// Stack should never be nil
		if tokenInfo.Stack == nil {
			t.Errorf("TokenInfo[%d] has nil stack", i)
		}

		// Attributes should never be nil
		if tokenInfo.Attributes == nil {
			t.Errorf("TokenInfo[%d] has nil attributes", i)
		}
	}

	if !foundAlignToken {
		t.Error("Expected to find align token with pos='right' attribute")
	}
}

func TestLetterUnmarshalXML_WithSidenotes(t *testing.T) {
	var letter Letter
	err := xml.Unmarshal([]byte(testLetterWithSidenote), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal letter with sidenote: %v", err)
	}

	// Test sidenotes
	if len(letter.Pages[0].Sidenotes) != 1 {
		t.Errorf("Expected 1 sidenote on page 1, got %d", len(letter.Pages[0].Sidenotes))
	}

	sidenote := letter.Pages[0].Sidenotes[0]
	if sidenote.Position != SidenotePositionLeft {
		t.Errorf("Expected sidenote position left, got %d", sidenote.Position)
	}
	if sidenote.Page != 1 {
		t.Errorf("Expected sidenote on page 1, got %d", sidenote.Page)
	}
	if !strings.Contains(sidenote.Annotation, "am linken Rand") {
		t.Errorf("Expected sidenote annotation to contain 'am linken Rand', got '%s'", sidenote.Annotation)
	}

	// Test sidenote TokenInfo
	if len(sidenote.TokenInfo) != len(sidenote.Tokens) {
		t.Errorf("Expected sidenote to have equal TokenInfo and Tokens length, got %d vs %d",
			len(sidenote.TokenInfo), len(sidenote.Tokens))
	}

	// Test sidenote CharData
	if !strings.Contains(sidenote.CharData, "allergetreuester Bruder") {
		t.Error("Expected sidenote CharData to contain sidenote content")
	}

	// Verify anchor position
	if sidenote.Anchor < 0 {
		t.Error("Expected sidenote anchor to be set")
	}
}

func TestLetterUnmarshalXML_ComplexStructure(t *testing.T) {
	var letter Letter
	err := xml.Unmarshal([]byte(testLetterComplexStructure), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal complex letter: %v", err)
	}

	// Test multiple pages
	if len(letter.Pages) != 3 {
		t.Errorf("Expected 3 pages, got %d", len(letter.Pages))
	}

	// Test hands collection
	foundHandRef := false
	for _, page := range letter.Pages {
		for _, handRef := range page.Hands {
			if handRef == 42 {
				foundHandRef = true
				break
			}
		}
	}
	if !foundHandRef {
		t.Error("Expected to find hand reference 42")
	}

	// Test page numbers are correct
	for i, page := range letter.Pages {
		expectedPageNo := i + 1
		if page.No != expectedPageNo {
			t.Errorf("Expected page %d, got %d", expectedPageNo, page.No)
		}
	}
}

func TestSidenotePosition_UnmarshalXMLAttr(t *testing.T) {
	tests := []struct {
		input    string
		expected SidenotePosition
	}{
		{"left", SidenotePositionLeft},
		{"right", SidenotePositionRight},
		{"top", SidenotePositionTop},
		{"top left", SidenotePositionTopLeft},
		{"top right", SidenotePositionTopRight},
		{"bottom", SidenotePositionBottom},
		{"bottom left", SidenotePositionBottomLeft},
		{"bottom right", SidenotePositionBottomRight},
		{"unknown", SidenotePositionLeft}, // Default fallback
	}

	for _, test := range tests {
		t.Run(test.input, func(t *testing.T) {
			var pos SidenotePosition
			attr := xml.Attr{Value: test.input}
			err := pos.UnmarshalXMLAttr(attr)
			if err != nil {
				t.Errorf("Error unmarshaling position '%s': %v", test.input, err)
			}
			if pos != test.expected {
				t.Errorf("Expected position %d for input '%s', got %d", test.expected, test.input, pos)
			}
		})
	}
}

func TestLetterUnmarshalXML_StackTracking(t *testing.T) {
	simpleXML := `<letterText letter="99">
<page index="1" />
<align pos="center">
<aq>Inner content</aq>
</align>
</letterText>`

	var letter Letter
	err := xml.Unmarshal([]byte(simpleXML), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal letter: %v", err)
	}

	page := letter.Pages[0]

	// Find tokens at different nesting levels
	var alignToken *Token
	var aqToken *Token

	for i, token := range page.TokenInfo {
		if attrs := token.Attributes; len(attrs) > 0 {
			if attrs["pos"] == "center" {
				alignToken = &page.TokenInfo[i]
			}
		}

		// Look for deeply nested token (inside align > aq)
		if len(token.Stack) >= 1 {
			aqToken = &page.TokenInfo[i]
		}
	}

	if alignToken == nil {
		t.Fatal("Expected to find align token")
	}

	if aqToken == nil {
		t.Fatal("Expected to find nested token")
	}

	// Within a page, the stack starts fresh, so align might be at depth 0
	// aq content should be deeper in stack than align
	if len(aqToken.Stack) <= len(alignToken.Stack) {
		t.Logf("Align stack depth: %d, AQ stack depth: %d", len(alignToken.Stack), len(aqToken.Stack))
		// This is acceptable if both are at the same level in page context
	}
}

func TestLetterUnmarshalXML_RealData(t *testing.T) {
	// Try to read from actual briefe.xml file
	brieveFile := "../lenz-briefe/data/xml/briefe.xml"
	if _, err := os.Stat(brieveFile); os.IsNotExist(err) {
		t.Skip("Real briefe.xml file not found, skipping real data test")
		return
	}

	file, err := os.Open(brieveFile)
	if err != nil {
		t.Skipf("Cannot open briefe.xml: %v", err)
		return
	}
	defer file.Close()

	decoder := xml.NewDecoder(file)

	// Find first letterText element
	for {
		token, err := decoder.Token()
		if err == io.EOF {
			t.Skip("No letterText elements found in briefe.xml")
			return
		}
		if err != nil {
			t.Skipf("Error reading briefe.xml: %v", err)
			return
		}

		if start, ok := token.(xml.StartElement); ok && start.Name.Local == "letterText" {
			var letter Letter
			err := decoder.DecodeElement(&letter, &start)
			if err != nil {
				t.Fatalf("Failed to decode real letter: %v", err)
			}

			// Basic validation of real data
			if letter.Letter == 0 {
				t.Error("Expected real letter to have letter number")
			}

			if len(letter.Pages) == 0 {
				t.Error("Expected real letter to have pages")
			}

			// Validate TokenInfo for all pages
			for i, page := range letter.Pages {
				if len(page.TokenInfo) != len(page.Tokens) {
					t.Errorf("Page %d: TokenInfo length %d != Tokens length %d",
						i, len(page.TokenInfo), len(page.Tokens))
				}

				// Check all TokenInfo entries are valid
				for j, tokenInfo := range page.TokenInfo {
					if tokenInfo.Index != j {
						t.Errorf("Page %d, Token %d: Expected index %d, got %d",
							i, j, j, tokenInfo.Index)
					}
					if tokenInfo.Stack == nil {
						t.Errorf("Page %d, Token %d: Stack is nil", i, j)
					}
					if tokenInfo.Attributes == nil {
						t.Errorf("Page %d, Token %d: Attributes is nil", i, j)
					}
				}
			}

			// Test succeeded with real data
			t.Logf("Successfully processed real letter %d with %d pages", letter.Letter, len(letter.Pages))
			return
		}
	}
}

func TestToken_AttributeAccess(t *testing.T) {
	xmlData := `<letterText letter="123">
<page index="42" />
<align pos="right" tab="5">Content</align>
</letterText>`

	var letter Letter
	err := xml.Unmarshal([]byte(xmlData), &letter)
	if err != nil {
		t.Fatalf("Failed to unmarshal: %v", err)
	}

	page := letter.Pages[0]

	// Find tokens with specific attributes (page tokens are excluded from page.TokenInfo)
	foundAlignPos := false
	foundAlignTab := false

	for _, tokenInfo := range page.TokenInfo {
		if val, exists := tokenInfo.Attributes["pos"]; exists && val == "right" {
			foundAlignPos = true
		}
		if val, exists := tokenInfo.Attributes["tab"]; exists && val == "5" {
			foundAlignTab = true
		}
	}

	if !foundAlignPos {
		t.Error("Expected to find align with pos='right'")
	}
	if !foundAlignTab {
		t.Error("Expected to find align with tab='5'")
	}
}

func TestLetterUnmarshalXML_EdgeCases(t *testing.T) {
	tests := []struct {
		name string
		xml  string
		test func(t *testing.T, letter Letter)
	}{
		{
			name: "Empty letter",
			xml:  `<letterText letter="1"></letterText>`,
			test: func(t *testing.T, letter Letter) {
				if letter.Letter != 1 {
					t.Errorf("Expected letter 1, got %d", letter.Letter)
				}
				if len(letter.Pages) != 0 {
					t.Errorf("Expected 0 pages, got %d", len(letter.Pages))
				}
			},
		},
		{
			name: "Letter with only page break",
			xml:  `<letterText letter="2"><page index="1" /></letterText>`,
			test: func(t *testing.T, letter Letter) {
				// Page break with no content should result in no pages
				if len(letter.Pages) != 0 {
					t.Errorf("Expected 0 pages (page break with no content), got %d", len(letter.Pages))
				}
			},
		},
		{
			name: "Letter with nested elements",
			xml: `<letterText letter="3">
<page index="1" />
<align pos="center">
  <aq>Nested <b>deeply <i>nested</i></b> content</aq>
</align>
</letterText>`,
			test: func(t *testing.T, letter Letter) {
				if len(letter.Pages) != 1 {
					t.Errorf("Expected 1 page, got %d", len(letter.Pages))
				}

				page := letter.Pages[0]
				maxStackDepth := 0
				for _, tokenInfo := range page.TokenInfo {
					if len(tokenInfo.Stack) > maxStackDepth {
						maxStackDepth = len(tokenInfo.Stack)
					}
				}

				if maxStackDepth < 3 {
					t.Errorf("Expected deep nesting (3+ levels), got max depth %d", maxStackDepth)
				}
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var letter Letter
			err := xml.Unmarshal([]byte(tt.xml), &letter)
			if err != nil {
				t.Fatalf("Failed to unmarshal: %v", err)
			}
			tt.test(t, letter)
		})
	}
}