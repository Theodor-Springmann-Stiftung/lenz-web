// INFO: We import this so vite processes the stylesheet
import "../public/css/fonts.css";
import "./site.css";
import "../public/js/alpine.min.js";
import "../public/js/htmx.min.js";
import "../public/js/htmx-response-targets.js";
import { Previewer } from "pagedjs";
import { ToolTip } from "./tool-tip.js";

const ATTR_XSLT_ONLOAD = "script[xslt-onload]";
const ATTR_XSLT_TEMPLATE = "xslt-template";
const ATTR_XSLT_STATE = "xslt-transformed";

const SCROLL_BUTTON_ELEMENT = "scroll-button";
const TOOLTIP_ELEMENT = "tool-tip";

class XSLTParseProcess {
	#processors;

	constructor() {
		this.#processors = new Map();
	}

	setup() {
		let els = htmx.findAll(ATTR_XSLT_ONLOAD);
		for (let element of els) {
			this.#transform_xslt(element);
		}
	}

	hookupHTMX() {
		// INFO: We can instead use afterSettle; and also clear the map with
		// xslt_processors.clear();
		htmx.on("htmx:load", (_) => {
			this.setup();
		});
	}

	#transform_xslt(element) {
		if (
			element.getAttribute(ATTR_XSLT_STATE) === "true" ||
			!element.hasAttribute(ATTR_XSLT_TEMPLATE)
		) {
			return;
		}

		let templateId = "#" + element.getAttribute(ATTR_XSLT_TEMPLATE);
		let processor = this.#processors.get(templateId);
		if (!processor) {
			let template = htmx.find(templateId);
			if (template) {
				let content = template.innerHTML
					? new DOMParser().parseFromString(template.innerHTML, "application/xml")
					: template.contentDocument;
				processor = new XSLTProcessor();
				processor.importStylesheet(content);
				this.#processors.set(templateId, processor);
			} else {
				throw new Error("Unknown XSLT template: " + templateId);
			}
		}

		let data = new DOMParser().parseFromString(element.innerHTML, "application/xml");
		let frag = processor.transformToFragment(data, document);
		let s = new XMLSerializer().serializeToString(frag);
		element.outerHTML = s;
	}
}

// INFO: these is a function to define simple reusable templates which we don't need.
// Since we can include templates server-side.
function setup_templates() {
	let templates = document.querySelectorAll("template[simple]");
	templates.forEach((template) => {
		let templateId = template.getAttribute("id");
		let templateContent = template.content;

		customElements.define(
			templateId,
			class extends HTMLElement {
				constructor() {
					super();
					this.appendChild(templateContent.cloneNode(true));
					this.slots = this.querySelectorAll("slot");
				}

				connectedCallback() {
					let toremove = [];
					this.slots.forEach((tslot) => {
						let slotName = tslot.getAttribute("name");
						let slotContent = this.querySelector(`[slot="${slotName}"]`);
						if (slotContent) {
							tslot.replaceWith(slotContent.cloneNode(true));
							toremove.push(slotContent);
						}
					});
					toremove.forEach((element) => {
						element.remove();
					});
				}
			},
		);
	});
}

class ScrollButton extends HTMLElement {
	constructor() {
		super();
		this.handleScroll = this.handleScroll.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
	}

	connectedCallback() {
		// Insert Tailwind-styled button in light DOM
		this.innerHTML = `
          <button
            class="
              scroll-to-top
              fixed bottom-5 right-5
              hidden
              bg-gray-800 text-white
              p-2
              rounded-md
              cursor-pointer
              text-2xl
              hover:opacity-80
              transition-opacity
              border-0
            "
            aria-label="Scroll to top"
          >
					<i class="ri-arrow-up-double-line"></i>
          </button>
        `;

		this._button = this.querySelector(".scroll-to-top");

		window.addEventListener("scroll", this.handleScroll);
		this._button.addEventListener("click", this.scrollToTop);
	}

	disconnectedCallback() {
		window.removeEventListener("scroll", this.handleScroll);
		this._button.removeEventListener("click", this.scrollToTop);
	}

	handleScroll() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		if (scrollTop > 300) {
			this._button.classList.remove("hidden");
		} else {
			this._button.classList.add("hidden");
		}
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}

function Startup() {
	let pagedPreviewer = null;
	const positionedIntervals = [];

	// INFO: Generate a print preview of the page if the URL has ?print=true
	if (new URL(window.location).searchParams.get("print") === "true") {
		showPreview();
	}

	// INFO: Listeners for sidenotes
	window.addEventListener("load", () => {
		alignSidenotes();
	});

	window.addEventListener("resize", alignSidenotes);

	if (htmx) {
		window.addEventListener("htmx:afterSettle", (_) => {
			alignSidenotes();
		});
	}

	function showPreview() {
		if (!pagedPreviewer) {
			pagedPreviewer = new Previewer();
		}

		pagedPreviewer.preview().then(() => {
			document.body.classList.add("previewing");
		});

		// INFO: this is probably not neccessary since we open the preview in a new window
		// but just in case.
		window.addEventListener("popstate", (_) => {
			window.location.reload();
		});
	}

	function alignSidenotes() {
		_alignSidenotes(".count", ".page", ".eanchor-page");
		_alignSidenotes(".notes", ".note-hand", ".hand");
		_alignSidenotes(".notes", ".note-sidenote-meta", ".sidenote");
	}

	function _alignSidenotes(container, align, alignto) {
		const fulltext = document.querySelector(".fulltext");
		const cont = document.querySelector(container);
		if (!cont) return;
		const notes = Array.from(cont.querySelectorAll(align));

		// Reset classes and inline styles
		notes.forEach((note) => {
			note.classList.remove("margin-note");
			note.style.top = "";
		});

		// Skip on print
		if (window.matchMedia("print").matches) return;

		const textRect = cont.getBoundingClientRect();
		const GUTTER = 0; // space in pixels between notes

		notes.forEach((note) => {
			const noteId = note.id;
			if (!noteId) return;
			const anchor = fulltext.querySelector(`${alignto}[aria-describedby="${noteId}"]`);
			if (!anchor) return;

			note.classList.add("margin-note");
			const anchorRect = anchor.getBoundingClientRect();
			const baseTop = anchorRect.top - textRect.top;

			const noteHeight = note.getBoundingClientRect().height;
			let top = baseTop;

			// Adjust to prevent overlap
			let collision;
			do {
				collision = false;
				for (const interval of positionedIntervals) {
					const intervalTop = interval.top;
					const intervalBottom = interval.bottom;
					if (top < intervalBottom && top + noteHeight > intervalTop) {
						console.log("Collision detected", {
							top,
							bottom: top + noteHeight,
							intervalTop,
							intervalBottom,
							newTop: intervalBottom + GUTTER,
						});
						top = intervalBottom + GUTTER;
						collision = true;
					}
				}
			} while (collision);

			// Record this note's interval
			positionedIntervals.push({ top, bottom: top + noteHeight });

			note.style.top = `${top}px`;
		});
		notes.forEach((note) => {
			note.style.visibility = "visible";
		});
	}
}

customElements.define(SCROLL_BUTTON_ELEMENT, ScrollButton);
customElements.define(TOOLTIP_ELEMENT, ToolTip);

export { XSLTParseProcess, ScrollButton, Previewer, Startup };
