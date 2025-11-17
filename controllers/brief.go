package controllers

import (
	"strconv"

	"github.com/Theodor-Springmann-Stiftung/lenz-web/xmlmodels"
	"github.com/gofiber/fiber/v2"
)

func GetLetter(c *fiber.Ctx) error {
	lib := xmlmodels.Get()
	l := c.Params(LETTER_PARAM)
	letter, err := strconv.Atoi(l)
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	meta := lib.Metas.Item(letter)
	if meta == nil {
		return c.SendStatus(fiber.StatusNotFound)
	}
	np := lib.NextPrev(meta)

	letterData := lib.Letters.Item(letter)
	if letterData == nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	text := fiber.Map{
		"count": "",
		"notes": "",
		"pages": []*xmlmodels.PageRender{},
		"html":  "",
	}
	if state := letterData.HTML.Data(); state != nil {
		text["html"] = state.String()
		text["count"] = state.CountHTML()
		text["notes"] = state.NotesHTML()
		text["pages"] = state.Pages
	}
	tradition := lib.Traditions.Item(letter)

	return c.Render("/brief/", fiber.Map{"meta": meta, "text": text, "tradition": tradition, "next": np.Next, "prev": np.Prev})
}
