package functions

import (
	"html/template"
	"strings"

	xmlparsing "github.com/Theodor-Springmann-Stiftung/lenz-web/xml"
)

func FirstLetter(s string) string {
	if len(s) == 0 {
		return ""
	}
	return string(s[:1])
}

func Safe(s string) template.HTML {
	if len(s) == 0 {
		return ""
	}
	return template.HTML(s)
}

type LenzParseState struct{}

func ParseGeneric(s string) string {
	if len(s) == 0 {
		return ""
	}

	builder := strings.Builder{}
	for elem, err := range xmlparsing.Iterate(s, LenzParseState{}) {
		if err != nil {
			return err.Error()
		}
		switch elem.Token.Type {
		case xmlparsing.StartElement:
			builder.WriteString("<div class=\"")
			builder.WriteString(elem.Token.Name)
			for key, value := range elem.Token.Attributes {
				builder.WriteString(" ")
				builder.WriteString(key)
				builder.WriteString("-")
				builder.WriteString(value)
			}

			builder.WriteString("\">")
		}

		if elem.Token.Type == xmlparsing.CharData {
			builder.WriteString(elem.Token.Data)
		}

		if elem.Token.Type == xmlparsing.EndElement {
			builder.WriteString("</div>")
		}
	}

	return builder.String()
}
