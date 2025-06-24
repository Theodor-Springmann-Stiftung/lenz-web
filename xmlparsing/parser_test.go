package xmlparsing

import (
	"testing"
)

type TestState struct {
	ParsedElements []string
}

func TestIterate_ValidXML(t *testing.T) {
	xmlData := `<root>
		<child attr="value">Text</child>
		<!-- This is a comment -->
		<?xml-stylesheet type="text/css" href="style.css"?>
		<!DOCTYPE note>
	</root>`

	state := TestState{}
	for tokenResult, err := range Iterate(xmlData, state) {
		if err != nil {
			t.Fatalf("Unexpected error: %v", err)
		}
		if tokenResult == nil {
			t.Fatal("Received nil token result")
		}
		state.ParsedElements = append(state.ParsedElements, tokenResult.Token.Name)
	}

	if len(state.ParsedElements) == 0 {
		t.Fatal("No elements were parsed")
	}
}

func TestIterate_InvalidXML(t *testing.T) {
	xmlData := `<root><child></root>`
	state := TestState{}
	var global error
	for _, err := range Iterate(xmlData, state) {
		if err != nil {
			global = err
		}
	}
	if global == nil {
		t.Fatal("Expected error, but got nil")
	}
}

func TestIterate_EmptyXML(t *testing.T) {
	xmlData := ""
	state := TestState{}
	for _, err := range Iterate(xmlData, state) {
		if err != nil {
			t.Fatalf("Expected iter.ErrEnd, but got: %v", err)
		}
	}
}

func TestIterate_CharDataTracking(t *testing.T) {
	xmlData := `<root>
		<child>First</child>
		<child>Second</child>
	</root>`

	state := TestState{}
	charDataCount := 0
	for tokenResult, err := range Iterate(xmlData, state) {
		if err != nil {
			t.Fatalf("Unexpected error: %v", err)
		}
		if tokenResult.Token.Name == "CharData" {
			charDataCount++
		}
	}

	if charDataCount != 5 {
		t.Fatalf("Expected 2 CharData elements, got %d", charDataCount)
	}
}

func TestIterate_AttributeParsing(t *testing.T) {
	xmlData := `<root>
		<child attr1="value1" attr2="value2">Content</child>
	</root>`

	state := TestState{}
	for tokenResult, err := range Iterate(xmlData, state) {
		if err != nil {
			t.Fatalf("Unexpected error: %v", err)
		}
		if tokenResult.Token.Name == "child" && tokenResult.Token.Type == StartElement {
			if tokenResult.Token.Attributes["attr1"] != "value1" || tokenResult.Token.Attributes["attr2"] != "value2" {
				t.Fatalf("Incorrect attributes parsed: %v", tokenResult.Token.Attributes)
			}
		}
	}
}
