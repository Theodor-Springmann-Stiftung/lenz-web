package xmlmodels

import (
	"encoding/xml"
	"strings"
	"testing"
)

// Helper function to convert []xml.Token back to string for testing
func tokensToString(tokens []xml.Token) string {
	var sb strings.Builder
	for _, token := range tokens {
		switch t := token.(type) {
		case xml.StartElement:
			sb.WriteString("<")
			sb.WriteString(t.Name.Local)
			for _, attr := range t.Attr {
				sb.WriteString(" ")
				sb.WriteString(attr.Name.Local)
				sb.WriteString(`="`)
				sb.WriteString(attr.Value)
				sb.WriteString(`"`)
			}
			sb.WriteString(">")
		case xml.EndElement:
			sb.WriteString("</")
			sb.WriteString(t.Name.Local)
			sb.WriteString(">")
		case xml.CharData:
			sb.Write(t)
		case xml.Comment:
			sb.WriteString("<!--")
			sb.Write(t)
			sb.WriteString("-->")
		case xml.ProcInst:
			sb.WriteString("<?")
			sb.WriteString(t.Target)
			if len(t.Inst) > 0 {
				sb.WriteString(" ")
				sb.Write(t.Inst)
			}
			sb.WriteString("?>")
		}
	}
	return sb.String()
}

func TestLetterTextUnmarshal_SimpleCase(t *testing.T) {
	// Simple test case with basic structure
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="123">
		Some content before first page break.
		<page index="1"/>
		Content on page 1 with <aq>some markup</aq> and more text.
		<sidenote pos="right" page="1" annotation="test">This is a sidenote</sidenote>
		More content on page 1.
		<page index="2"/>
		Content on page 2 with <b>bold text</b>.
		<hand ref="42">Hand reference content</hand>
		Final content on page 2.
	</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling XML: %v", err)
	}

	// Verify basic structure
	if len(letterText.Pages) != 3 {
		t.Errorf("Expected 3 pages, got %d", len(letterText.Pages))
	}
	if len(letterText.PageBreaks) != 2 {
		t.Errorf("Expected 2 page breaks, got %d", len(letterText.PageBreaks))
	}
	if len(letterText.Sidenotes) != 1 {
		t.Errorf("Expected 1 sidenote, got %d", len(letterText.Sidenotes))
	}
	if letterText.Hands.Reference != 42 {
		t.Errorf("Expected hand reference 42, got %d", letterText.Hands.Reference)
	}

	// Verify page breaks
	if letterText.PageBreaks[0].Index != 1 {
		t.Errorf("Expected page break index 1, got %d", letterText.PageBreaks[0].Index)
	}
	if letterText.PageBreaks[1].Index != 2 {
		t.Errorf("Expected page break index 2, got %d", letterText.PageBreaks[1].Index)
	}

	// Verify sidenote
	sidenote := letterText.Sidenotes[0]
	if sidenote.Page != 1 {
		t.Errorf("Expected sidenote on page 1, got %d", sidenote.Page)
	}
	if sidenote.Position != SidenotePositionRight {
		t.Errorf("Expected sidenote position right, got %d", sidenote.Position)
	}
	if sidenote.Annotation != "test" {
		t.Errorf("Expected sidenote annotation 'test', got '%s'", sidenote.Annotation)
	}
	sidenoteContent := tokensToString(sidenote.Content)
	if !strings.Contains(sidenoteContent, "This is a sidenote") {
		t.Errorf("Expected sidenote content to contain 'This is a sidenote', got '%s'", sidenoteContent)
	}

	// Verify page content doesn't contain sidenote text
	for _, page := range letterText.Pages {
		content := tokensToString(page.Content)
		if strings.Contains(content, "This is a sidenote") {
			t.Errorf("Page content should not contain sidenote text, but page %d does: %s", page.Page, content)
		}
	}
}

func TestLetterTextUnmarshal_RealExample_Letter1(t *testing.T) {
	// Real example from briefe.xml - Letter 1 (simplified)
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="1">
<page index="1" /><align pos="right">HochEdelgeborner Hochgelahrter Herr <aq>Secretair</aq></align>
<line type="break" tab="7" /><align pos="right">Verehrungswürdigster Gönner!</align>
<line type="empty" />
Ew. HochEdelgebh: haben mich durch die neue Probe von Dero schätzbaren Gewogenheit ausserorndtlich beschämt. Meine Feder ist zu schwach, Denenselben die regen Empfindungen meines Herzens darüber zu schildern.
<page index="2" />lasse mich noch lange das Glück genießen, Dieselben in dem blühendsten Wohlstande zu sehen, und mich mit dem erkenntlichsten Herzen nennen zu dürfen
<line type="empty" />
<line type="break" /><align pos="right">Hoch Edelgeborner Hochgelahrter Herr <aq>Secretair</aq>
<line type="break" tab="7" />Verehrungswürdigster Gönner
<line type="break" tab="7" />Ew. HochEdelgebh:</align>
Von Hause, d. 2 Jenner, 1765.
<align pos="right">gehorsamsten Diener
<line type="break" />Jacob Michael Reinhold Lenz</align>
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling real XML: %v", err)
	}

	// Should have 2 pages
	if len(letterText.Pages) != 2 {
		t.Errorf("Expected 2 pages, got %d", len(letterText.Pages))
	}
	if len(letterText.PageBreaks) != 2 {
		t.Errorf("Expected 2 page breaks, got %d", len(letterText.PageBreaks))
	}

	// Verify page content contains expected elements
	page1Found := false
	page2Found := false
	for _, page := range letterText.Pages {
		content := tokensToString(page.Content)
		if page.Page == 1 && strings.Contains(content, "HochEdelgeborner") {
			page1Found = true
		}
		if page.Page == 2 && strings.Contains(content, "Jacob Michael Reinhold Lenz") {
			page2Found = true
		}
	}

	if !page1Found {
		t.Error("Page 1 content not found correctly")
	}
	if !page2Found {
		t.Error("Page 2 content not found correctly")
	}
}

func TestLetterTextUnmarshal_WithSidenotes(t *testing.T) {
	// Real example with sidenotes from briefe.xml
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="2">
<page index="1" />Some text before sidenote.
<sidenote pos="left" page="1" annotation=" am linken Rand der zweiten Seite, vertikal">Ich umarme Dich und küsse Dich 1000mahl als Dein
<line type="break" />allergetreuester Bruder
<line type="break" />Jacob Michael Reinhold Lenz.
<line type="break" />Dorpat den 11ten October 1767.</sidenote>
More text after sidenote.
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling sidenote XML: %v", err)
	}

	// Should have 1 sidenote
	if len(letterText.Sidenotes) != 1 {
		t.Errorf("Expected 1 sidenote, got %d", len(letterText.Sidenotes))
	}

	// Verify sidenote details
	sidenote := letterText.Sidenotes[0]
	if sidenote.Position != SidenotePositionLeft {
		t.Errorf("Expected sidenote position left, got %d", sidenote.Position)
	}
	if sidenote.Page != 1 {
		t.Errorf("Expected sidenote on page 1, got %d", sidenote.Page)
	}
	if !strings.Contains(sidenote.Annotation, "am linken Rand") {
		t.Errorf("Expected sidenote annotation to contain 'am linken Rand', got '%s'", sidenote.Annotation)
	}
	sidenoteContent := tokensToString(sidenote.Content)
	if !strings.Contains(sidenoteContent, "Jacob Michael Reinhold Lenz") {
		t.Errorf("Expected sidenote content to contain author name, got '%s'", sidenoteContent)
	}

	// Verify page content doesn't contain sidenote
	for _, page := range letterText.Pages {
		content := tokensToString(page.Content)
		if strings.Contains(content, "allergetreuester Bruder") {
			t.Errorf("Page content should not contain sidenote text, but page %d does", page.Page)
		}
	}
}

func TestLetterTextUnmarshal_ComplexSidenotePositions(t *testing.T) {
	// Test different sidenote positions
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="3">
<page index="1" />
<sidenote pos="top right" page="1" annotation="test1">Top right sidenote</sidenote>
<sidenote pos="bottom left" page="1" annotation="test2">Bottom left sidenote</sidenote>
<sidenote pos="top" page="1" annotation="test3">Top sidenote</sidenote>
Some content.
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling complex sidenotes XML: %v", err)
	}

	if len(letterText.Sidenotes) != 3 {
		t.Fatalf("Expected 3 sidenotes, got %d", len(letterText.Sidenotes))
	}

	// Check position parsing
	positions := make(map[SidenotePosition]bool)
	for _, sidenote := range letterText.Sidenotes {
		positions[sidenote.Position] = true
	}

	expectedPositions := []SidenotePosition{
		SidenotePositionTopRight,
		SidenotePositionBottomLeft,
		SidenotePositionTop,
	}

	for _, expected := range expectedPositions {
		if !positions[expected] {
			t.Errorf("Expected to find sidenote position %d, but didn't", expected)
		}
	}
}

func TestLetterTextUnmarshal_NoPageBreaks(t *testing.T) {
	// Test letter without explicit page breaks
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="4">
This is all content on the default page.
<aq>Some markup</aq> and more text.
<sidenote pos="right" page="1" annotation="single page note">Note on single page</sidenote>
Final text.
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling no-page-break XML: %v", err)
	}

	// Should have 1 page (default page 1)
	if len(letterText.Pages) != 1 {
		t.Errorf("Expected 1 page, got %d", len(letterText.Pages))
	}
	if len(letterText.PageBreaks) != 0 {
		t.Errorf("Expected 0 page breaks, got %d", len(letterText.PageBreaks))
	}

	// Page should be page 1
	if letterText.Pages[0].Page != 1 {
		t.Errorf("Expected page 1, got page %d", letterText.Pages[0].Page)
	}

	// Content should contain markup but not sidenote
	content := tokensToString(letterText.Pages[0].Content)
	if !strings.Contains(content, "<aq>Some markup</aq>") {
		t.Error("Expected page content to contain markup")
	}
	if strings.Contains(content, "Note on single page") {
		t.Error("Page content should not contain sidenote text")
	}
}

func TestLetterTextUnmarshal_EmptyContent(t *testing.T) {
	// Test edge case with empty content
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="5">
<page index="1" />
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling empty XML: %v", err)
	}

	// Should have no pages with content
	if len(letterText.Pages) != 0 {
		t.Errorf("Expected 0 pages with content, got %d", len(letterText.Pages))
	}
	if len(letterText.PageBreaks) != 1 {
		t.Errorf("Expected 1 page break, got %d", len(letterText.PageBreaks))
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
		var pos SidenotePosition
		attr := xml.Attr{Value: test.input}
		err := pos.UnmarshalXMLAttr(attr)
		if err != nil {
			t.Errorf("Error unmarshaling position '%s': %v", test.input, err)
		}
		if pos != test.expected {
			t.Errorf("Expected position %d for input '%s', got %d", test.expected, test.input, pos)
		}
	}
}

func TestLetterTextUnmarshal_PreserveMarkup(t *testing.T) {
	// Test that various markup elements are preserved in page content
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="6">
<page index="1" />
Text with <aq>antiqua</aq> and <b>bold</b> and <it>italic</it>.
<line type="break" tab="5" />
<align pos="center">Centered text</align>
<ul>Underlined text</ul>
<del>Deleted text</del>
More content with <pe>person reference</pe>.
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling markup XML: %v", err)
	}

	if len(letterText.Pages) != 1 {
		t.Fatalf("Expected 1 page, got %d", len(letterText.Pages))
	}

	content := tokensToString(letterText.Pages[0].Content)
	expectedMarkup := []string{
		"<aq>antiqua</aq>",
		"<b>bold</b>",
		"<it>italic</it>",
		"<line type=\"break\" tab=\"5\">",
		"<align pos=\"center\">",
		"<ul>Underlined text</ul>",
		"<del>Deleted text</del>",
		"<pe>person reference</pe>",
	}

	for _, markup := range expectedMarkup {
		if !strings.Contains(content, markup) {
			t.Errorf("Expected page content to contain '%s', but it doesn't. Content: %s", markup, content)
		}
	}
}

func TestLetterTextUnmarshal_LetterAttribute(t *testing.T) {
	// Test that the letter attribute is parsed correctly
	testXML := `<letterText xmlns="https://lenz-archiv.de" letter="42">
<page index="1" />
Some content.
</letterText>`

	var letterText LetterText
	err := xml.Unmarshal([]byte(testXML), &letterText)
	if err != nil {
		t.Fatalf("Error unmarshaling letter attribute XML: %v", err)
	}

	// Verify letter attribute is parsed
	if letterText.Letter != 42 {
		t.Errorf("Expected letter attribute 42, got %d", letterText.Letter)
	}
}

func TestLetterTextUnmarshal_LetterAttribute_AllExistingTests(t *testing.T) {
	// Test that existing test cases also have correct letter attributes
	testCases := []struct {
		name           string
		xml            string
		expectedLetter int
	}{
		{
			name: "Simple case",
			xml: `<letterText xmlns="https://lenz-archiv.de" letter="123">
				<page index="1"/>Some content.
			</letterText>`,
			expectedLetter: 123,
		},
		{
			name: "Real example letter 1",
			xml: `<letterText xmlns="https://lenz-archiv.de" letter="1">
				<page index="1" />Some content.
			</letterText>`,
			expectedLetter: 1,
		},
		{
			name: "Letter with sidenotes",
			xml: `<letterText xmlns="https://lenz-archiv.de" letter="999">
				<page index="1" />
				<sidenote pos="left" page="1" annotation="test">Note</sidenote>
				Content.
			</letterText>`,
			expectedLetter: 999,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			var letterText LetterText
			err := xml.Unmarshal([]byte(tc.xml), &letterText)
			if err != nil {
				t.Fatalf("Error unmarshaling XML: %v", err)
			}

			if letterText.Letter != tc.expectedLetter {
				t.Errorf("Expected letter attribute %d, got %d", tc.expectedLetter, letterText.Letter)
			}
		})
	}
}