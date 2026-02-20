package xmlmodels

import (
	"encoding/xml"
	"strconv"
)

func isASCIISpaceByte(b byte) bool {
	return b == ' ' || b == '\t' || b == '\n' || b == '\r'
}

func trimLeftASCIISpace(s string) string {
	i := 0
	for i < len(s) && isASCIISpaceByte(s[i]) {
		i++
	}
	return s[i:]
}

func trimRightASCIISpace(s string) string {
	i := len(s)
	for i > 0 && isASCIISpaceByte(s[i-1]) {
		i--
	}
	return s[:i]
}

func trimASCIISpace(s string) string {
	return trimRightASCIISpace(trimLeftASCIISpace(s))
}

func isOnlyASCIISpace(s string) bool {
	if len(s) == 0 {
		return true
	}
	for i := 0; i < len(s); i++ {
		if !isASCIISpaceByte(s[i]) {
			return false
		}
	}
	return true
}

func hasLeadingASCIISpace(s string) bool {
	return len(s) > 0 && isASCIISpaceByte(s[0])
}

func hasTrailingASCIISpace(s string) bool {
	return len(s) > 0 && isASCIISpaceByte(s[len(s)-1])
}

func attrsToMap(attrs []xml.Attr) map[string]string {
	if len(attrs) == 0 {
		return nil
	}
	m := make(map[string]string, len(attrs))
	for _, a := range attrs {
		m[a.Name.Local] = a.Value
	}
	return m
}

func isInline(name string) bool {
	switch name {
	// BASE + note + specials + inline-block things treated as inline for stack correctness
	case "aq", "b", "del", "dul", "tul", "er", "gr", "hb", "ink", "it", "pe", "ru", "tl", "ul",
		"note",
		"fn", "nr", "subst", "insertion", "hand",
		"align", "tab":
		return true
	default:
		return false
	}
}

func isTransparentWrapper(name string) bool {
	// IMPORTANT: address subtree is NOT skipped; wrapper tokens are ignored only.
	return name == "tabs" || name == "address"
}

func parseLineMarker(se xml.StartElement) (LineType, int, bool) {
	var (
		indent int
		typ    string
	)
	for _, a := range se.Attr {
		switch a.Name.Local {
		case "tab":
			if n, err := strconv.Atoi(trimASCIISpace(a.Value)); err == nil && n > 0 {
				indent = n
			}
		case "type":
			typ = trimASCIISpace(a.Value)
		}
	}
	if typ == "empty" {
		return Empty, 0, true
	}
	if indent > 0 {
		return Indent, indent, false
	}
	if typ == "break" {
		return Semantic, 0, false
	}
	return Continuation, 0, false
}
