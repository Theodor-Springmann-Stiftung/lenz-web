package xmlmodels

import "testing"

func TestPageRendering(t *testing.T) {
	content := `<letterText><page index="1"/><line>First</line><page index="2"/><line>Second</line></letterText>`
	parsed, err := parseText(nil, content)
	if err != nil {
		t.Fatalf("parse error: %v", err)
	}
	state := parsed.Data()
	for i, page := range state.Pages {
		t.Logf("page %d idx=%s html=%q", i, page.Index, page.HTML())
	}
	if len(state.Pages) != 2 {
		t.Fatalf("expected 2 pages, got %d", len(state.Pages))
	}
	for i, page := range state.Pages {
		if page.HTML() == "" {
			t.Fatalf("page %d empty", i)
		}
	}
}
