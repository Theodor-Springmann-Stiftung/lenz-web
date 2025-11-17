package controllers

import (
	"encoding/json"
	"sort"
	"strconv"
	"strings"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

type filterItem struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func GetLetters(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	_, yearmap := lib.Years()
	rangeParam := c.Query("range", "")
	personParam := strings.TrimSpace(c.Query("person", ""))
	placeParam := strings.TrimSpace(c.Query("ort", ""))

	personID := 0
	if personParam != "" {
		if id, err := strconv.Atoi(personParam); err == nil && id > 0 {
			personID = id
		} else {
			personParam = ""
		}
	}

	placeID := 0
	if placeParam != "" {
		if id, err := strconv.Atoi(placeParam); err == nil && id > 0 {
			placeID = id
		} else {
			placeParam = ""
		}
	}

	rawQuery := string(c.Context().URI().QueryString())
	lastPerson := strings.LastIndex(rawQuery, "person=")
	lastPlace := strings.LastIndex(rawQuery, "ort=")
	if lastPerson >= 0 && lastPlace >= 0 {
		if lastPlace > lastPerson {
			personID = 0
			personParam = ""
		} else {
			placeID = 0
			placeParam = ""
		}
	}

	if personID > 0 && placeID > 0 {
		// Fallback if we couldn't determine query order.
		placeID = 0
		placeParam = ""
	}

	personOptions := make(map[int]filterItem)
	placeOptions := make(map[int]filterItem)

	addPerson := func(id int) {
		if id <= 0 {
			return
		}
		if _, ok := personOptions[id]; ok {
			return
		}
		if def := lib.Person(id); def != nil {
			name := strings.TrimSpace(def.Name)
			if name == "" {
				name = strings.TrimSpace(def.FirstName + " " + def.LastName)
			}
			if name == "" {
				name = strings.TrimSpace(def.Ref)
			}
			if name == "" {
				name = "Person " + strconv.Itoa(id)
			}
			personOptions[id] = filterItem{ID: id, Name: name}
		}
	}

	addPlace := func(id int) {
		if id <= 0 {
			return
		}
		if _, ok := placeOptions[id]; ok {
			return
		}
		if def := lib.Place(id); def != nil {
			name := strings.TrimSpace(def.Name)
			if name == "" {
				name = strings.TrimSpace(def.Ref)
			}
			if name == "" {
				name = "Ort " + strconv.Itoa(id)
			}
			placeOptions[id] = filterItem{ID: id, Name: name}
		}
	}

	collectRefs := func(meta xmlmodels.Meta) {
		for _, action := range meta.Sent {
			for _, ref := range action.Persons {
				addPerson(ref.Reference)
			}
			for _, ref := range action.Places {
				addPlace(ref.Reference)
			}
		}
		for _, action := range meta.Recieved {
			for _, ref := range action.Persons {
				addPerson(ref.Reference)
			}
			for _, ref := range action.Places {
				addPlace(ref.Reference)
			}
		}
	}

	filterLetter := func(meta xmlmodels.Meta) bool {
		if personID > 0 && !meta.HasPerson(personID) {
			return false
		}
		if placeID > 0 && !meta.HasPlace(placeID) {
			return false
		}
		return true
	}
	// TODO: does not work ATM
	c.Locals("path", c.Path())

	// Define the date ranges
	ranges := []DateRange{
		{Label: "1756–1770", Start: 1756, End: 1770, Letters: []xmlmodels.Meta{}},
		{Label: "1771–1775", Start: 1771, End: 1775, Letters: []xmlmodels.Meta{}},
		{Label: "1776", Start: 1776, End: 1776, Letters: []xmlmodels.Meta{}},
		{Label: "1777–1779", Start: 1777, End: 1779, Letters: []xmlmodels.Meta{}},
		{Label: "1780–1792", Start: 1780, End: 1792, Letters: []xmlmodels.Meta{}},
	}

	// Group letters by date ranges
	for year, letters := range yearmap {
		for i := range ranges {
			if year >= ranges[i].Start && year <= ranges[i].End {
				for _, letter := range letters {
					collectRefs(letter)
					if filterLetter(letter) {
						ranges[i].Letters = append(ranges[i].Letters, letter)
					}
				}
				break
			}
		}
	}

	if personID > 0 || placeID > 0 {
		rangeParam = "all"
	}

	// Handle specific range selection
	selectedRange := -1
	for i, r := range ranges {
		if r.Label == rangeParam {
			selectedRange = i
			break
		}
	}

	querySuffix := ""
	if personParam != "" {
		querySuffix += "&person=" + personParam
	}
	if placeParam != "" {
		querySuffix += "&ort=" + placeParam
	}

	personList := make([]filterItem, 0, len(personOptions))
	for _, item := range personOptions {
		personList = append(personList, item)
	}
	sort.Slice(personList, func(i, j int) bool {
		return strings.ToLower(personList[i].Name) < strings.ToLower(personList[j].Name)
	})

	placeList := make([]filterItem, 0, len(placeOptions))
	for _, item := range placeOptions {
		placeList = append(placeList, item)
	}
	sort.Slice(placeList, func(i, j int) bool {
		return strings.ToLower(placeList[i].Name) < strings.ToLower(placeList[j].Name)
	})

	personJSON, _ := json.Marshal(personList)
	placeJSON, _ := json.Marshal(placeList)

	return c.Render(LETTERS_URL+"/", fiber.Map{
		"ranges":        ranges,
		"selectedRange": selectedRange,
		"all":           rangeParam == "all",
		"person":        personParam,
		"ort":           placeParam,
		"query":         querySuffix,
		"personJSON":    string(personJSON),
		"placeJSON":     string(placeJSON),
	})
}
