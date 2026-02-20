package xmlmodels

import (
	"encoding/xml"
	"os"
	"slices"
	"strings"
	"testing"
)

type examplesRoot struct {
	Letters []Letter `xml:"letterText"`
}

func loadExampleLetters(t *testing.T) []Letter {
	t.Helper()

	paths := []string{"example.xml", "../example.xml"}
	var data []byte
	var err error
	for _, p := range paths {
		data, err = os.ReadFile(p)
		if err == nil {
			break
		}
	}
	if err != nil {
		t.Fatalf("read example.xml: %v", err)
	}

	var root examplesRoot
	if err := xml.Unmarshal(data, &root); err != nil {
		t.Fatalf("unmarshal example.xml: %v", err)
	}
	if len(root.Letters) == 0 {
		t.Fatalf("example.xml contained no letterText elements")
	}
	return root.Letters
}

func TestLettersFromExampleXMLRespectLineInvariants(t *testing.T) {
	letters := loadExampleLetters(t)

	var foundLetterFirst bool
	var foundSidenoteFirst bool
	var foundPageStartContinuation bool
	var foundSyntheticCarry bool

	for _, letter := range letters {
		for pageIdx, page := range letter.Data {
			if len(page.Lines) > 0 && page.Lines[0].Type == First {
				foundLetterFirst = true
			}
			if pageIdx > 0 && len(page.Lines) > 0 && page.Lines[0].Type == Continuation {
				foundPageStartContinuation = true
			}

			for i := 0; i+1 < len(page.Lines); i++ {
				if linePairHasValidSyntheticCarry(page.Lines[i], page.Lines[i+1]) {
					foundSyntheticCarry = true
				}
			}

			for _, sn := range page.Sidenotes {
				if len(sn.Lines) > 0 && sn.Lines[0].Type == First {
					foundSidenoteFirst = true
				}
				for i := 0; i+1 < len(sn.Lines); i++ {
					if linePairHasValidSyntheticCarry(sn.Lines[i], sn.Lines[i+1]) {
						foundSyntheticCarry = true
					}
				}
			}
		}
	}

	if !foundLetterFirst {
		t.Fatalf("expected at least one letter page to start with synthetic First line")
	}
	if !foundSidenoteFirst {
		t.Fatalf("expected at least one sidenote to start with synthetic First line")
	}
	if !foundPageStartContinuation {
		t.Fatalf("expected at least one non-initial page to start with Continuation line")
	}
	if !foundSyntheticCarry {
		t.Fatalf("expected at least one synthetic close/reopen carry between consecutive lines")
	}
}

func TestLettersFromExampleXMLSyntheticContinuationsAreConsistent(t *testing.T) {
	letters := loadExampleLetters(t)

	for _, letter := range letters {
		for pageIdx, page := range letter.Data {
			for lineIdx, line := range page.Lines {
				assertLineLocallyValid(t, letter.Letter, page.Number, "page", lineIdx, line)
			}

			for i := 0; i+1 < len(page.Lines); i++ {
				assertCarryPair(
					t,
					letter.Letter,
					page.Number,
					"page",
					i,
					page.Lines[i],
					page.Lines[i+1],
				)
			}

			if pageIdx > 0 && len(page.Lines) > 0 && len(letter.Data[pageIdx-1].Lines) > 0 {
				prevPage := letter.Data[pageIdx-1]
				assertCarryPair(
					t,
					letter.Letter,
					page.Number,
					"page-boundary",
					0,
					prevPage.Lines[len(prevPage.Lines)-1],
					page.Lines[0],
				)
			}

			for _, sn := range page.Sidenotes {
				for lineIdx, line := range sn.Lines {
					assertLineLocallyValid(t, letter.Letter, page.Number, "sidenote", lineIdx, line)
				}
				for i := 0; i+1 < len(sn.Lines); i++ {
					assertCarryPair(
						t,
						letter.Letter,
						page.Number,
						"sidenote",
						i,
						sn.Lines[i],
						sn.Lines[i+1],
					)
				}
			}
		}
	}
}

func assertLineLocallyValid(t *testing.T, letter, page int, where string, lineIdx int, line Line) {
	t.Helper()

	sawNonContToken := false
	for tokIdx, tok := range line.Tokens {
		if tok.Type == StartElement && tok.Synth {
			if sawNonContToken {
				t.Fatalf("letter %d page %d %s line %d has synthetic opener after non-prefix token at token %d", letter, page, where, lineIdx, tokIdx)
			}
			continue
		}
		sawNonContToken = true
	}

	sawContCloser := false
	for tokIdx, tok := range line.Tokens {
		if tok.Type == EndElement && tok.Synth {
			sawContCloser = true
			continue
		}
		if sawContCloser {
			t.Fatalf("letter %d page %d %s line %d has token after synthetic closer at token %d", letter, page, where, lineIdx, tokIdx)
		}
	}

	var stack []string
	var textFromTokens strings.Builder
	for tokIdx, tok := range line.Tokens {
		switch tok.Type {
		case StartElement:
			stack = append(stack, tok.Name)
		case EndElement:
			if len(stack) == 0 || stack[len(stack)-1] != tok.Name {
				t.Fatalf("letter %d page %d %s line %d has unbalanced end token %q at token %d", letter, page, where, lineIdx, tok.Name, tokIdx)
			}
			stack = stack[:len(stack)-1]
		case CharData:
			textFromTokens.WriteString(tok.Value)
			if isOnlyASCIISpace(tok.Value) {
				if isLineStartPosition(line, tokIdx) {
					t.Fatalf("letter %d page %d %s line %d contains leading whitespace-only chardata token at token %d", letter, page, where, lineIdx, tokIdx)
				}
				if tok.Value != " " {
					t.Fatalf("letter %d page %d %s line %d contains non-normalized whitespace token %q at token %d", letter, page, where, lineIdx, tok.Value, tokIdx)
				}
			}
		}
	}
	if len(stack) != 0 {
		t.Fatalf("letter %d page %d %s line %d ended with %d unclosed tags", letter, page, where, lineIdx, len(stack))
	}
	if line.Text != textFromTokens.String() {
		t.Fatalf("letter %d page %d %s line %d has Text mismatch: %q != %q", letter, page, where, lineIdx, line.Text, textFromTokens.String())
	}
	if line.Text != "" {
		if hasLeadingASCIISpace(line.Text) {
			t.Fatalf("letter %d page %d %s line %d has Text starting with whitespace: %q", letter, page, where, lineIdx, line.Text)
		}
		if hasTrailingASCIISpace(line.Text) {
			t.Fatalf("letter %d page %d %s line %d has Text ending with whitespace: %q", letter, page, where, lineIdx, line.Text)
		}
	}
}

func isLineStartPosition(line Line, idx int) bool {
	for i := 0; i < idx; i++ {
		tok := line.Tokens[i]
		if tok.Type == StartElement && tok.Synth {
			continue
		}
		return false
	}
	return true
}

func assertCarryPair(t *testing.T, letter, page int, where string, lineIdx int, prev, next Line) {
	t.Helper()

	closed := syntheticClosedNames(prev)
	reopened := syntheticReopenedPrefixNames(next)

	if len(closed) == 0 {
		if len(reopened) != 0 {
			t.Fatalf("letter %d page %d %s line %d->%d reopens %d tags with no synthetic closes in previous line", letter, page, where, lineIdx, lineIdx+1, len(reopened))
		}
		return
	}

	slices.Reverse(closed)
	if !slices.Equal(closed, reopened) {
		t.Fatalf("letter %d page %d %s line %d->%d synthetic carry mismatch: closed=%v reopened=%v", letter, page, where, lineIdx, lineIdx+1, closed, reopened)
	}
}

func syntheticClosedNames(line Line) []string {
	var out []string
	for _, tok := range line.Tokens {
		if tok.Type == EndElement && tok.Synth {
			out = append(out, tok.Name)
		}
	}
	return out
}

func syntheticReopenedPrefixNames(line Line) []string {
	var out []string
	for _, tok := range line.Tokens {
		if tok.Type == StartElement && tok.Synth {
			out = append(out, tok.Name)
			continue
		}
		break
	}
	return out
}

func linePairHasValidSyntheticCarry(prev, next Line) bool {
	closed := syntheticClosedNames(prev)
	if len(closed) == 0 {
		return false
	}

	slices.Reverse(closed)
	reopened := syntheticReopenedPrefixNames(next)
	if len(reopened) < len(closed) {
		return false
	}
	for i := range closed {
		if reopened[i] != closed[i] {
			return false
		}
	}
	return true
}
