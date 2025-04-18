// INFO: We import this so vite processes the stylesheet
import "../public/css/fonts.css";
import "./site.css";
import "../public/js/alpine.min.js";
import "../public/js/htmx.min.js";
import "../public/js/htmx-response-targets.js";

const ATTR_XSLT_ONLOAD = "script[xslt-onload]";
const ATTR_XSLT_TEMPLATE = "xslt-template";
const ATTR_XSLT_STATE = "xslt-transformed";

const FILTER_LIST_ELEMENT = "filter-list";
const FILTER_LIST_LIST = "filter-list-list";
const FILTER_LIST_ITEM = "filter-list-item";
const FILTER_LIST_INPUT = "filter-list-input";
const FILTER_LIST_SEARCHABLE = "filter-list-searchable";

const SCROLL_BUTTON_ELEMENT = "scroll-button";
const TOOLTIP_ELEMENT = "tool-tip";
const ABBREV_TOOLTIPS_ELEMENT = "abbrev-tooltips";
const INT_LINK_ELEMENT = "int-link";
const POPUP_IMAGE_ELEMENT = "popup-image";
const TABLIST_ELEMENT = "tab-list";
const FILTER_PILL_ELEMENT = "filter-pill";
const IMAGE_REEL_ELEMENT = "image-reel";

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

class FilterPill extends HTMLElement {
	constructor() {
		super();
		this._value = "";
		this.render();
	}

	static get observedAttributes() {
		return ["data-text", "data-queryparam", "data-value"];
	}

	set value(value) {
		this.setAttribute("data-value", value);
	}

	get value() {
		return this.getAttribute("data-value") || "";
	}

	set text(value) {
		this.setAttribute("data-text", value);
	}

	get text() {
		return this.getAttribute("data-text") || "";
	}

	set queryparam(value) {
		this.setAttribute("data-queryparam", value);
	}

	get queryparam() {
		return this.getAttribute("data-queryparam") || "";
	}

	connectedCallback() {
		this._filter = this.text;
		this._queryparam = this.queryparam;
		this.render();
		htmx.process(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === "data-text") {
				this._filter = newValue;
			}
			if (name === "data-queryparam") {
				this._queryparam = newValue;
			}
			if (name === "data-value") {
				this._value = newValue;
			}
			this.render();
		}
	}

	getURL() {
		if (this._queryparam) {
			let url = new URL(window.location);
			let params = new URLSearchParams(url.search);
			params.delete(this._queryparam);
			params.delete("page");
			url.search = params.toString();
			return url.toString();
		}
		return "#";
	}

	render() {
		this.innerHTML = `
		<a href="${this.getURL()}" class="!no-underline block text-base" hx-target="#searchresults" hx-select="#searchresults" hx-indicator="body" hx-swap="outerHTML show:window:top">
			<div class="flex flex-row filter-pill rounded-lg bg-orange-100 hover:saturate-50 px-2.5">
				${this.renderIcon()}
				<div class="flex flex-row filter-pill-label-value !items-baseline text-slate-700">
					<div class="filter-pill-label font-bold mr-1.5 align-baseline">${this.text}</div>
					${this.renderValue()}
				</div>
			</div>
		</a>
		`;
	}

	renderIcon() {
		const isBool = this.value === "true" || this.value === "false";
		if (!isBool) {
			return `<div
				href="${this.getURL()}"
				class="filter-pill-close no-underline font-bold mr-1 text-orange-900 hover:text-orange-800">
				<i class="ri-arrow-left-s-line"></i>
			</div>
			`;
		}
		return `
			<div href="${this.getURL()}" class="filter-pill-close no-underline font-bold mr-1 text-orange-900 hover:text-orange-800">
				<i class="ri-close-circle-line"></i>
			</div>
		`;
	}

	renderValue() {
		const isBool = this.value === "true" || this.value === "false";
		if (isBool) return ``;
		return `
			<div class="filter-pill-value">${this.value}</div>
		`;
	}
}

class FilterList extends HTMLElement {
	#hiddenlist = false;
	#activequery = "";

	constructor() {
		super();
		this._items = [];
		this._url = "";
		this._filterstart = false;
		this._placeholder = "Liste filtern...";
		this._queryparam = "";
		this._startparams = null;
		this.render();
	}

	static get observedAttributes() {
		return ["data-url"];
	}

	set items(data) {
		if (Array.isArray(data)) {
			this._items = data;
			this.render();
		}
	}

	get items() {
		return this._items;
	}

	connectedCallback() {
		this._url = this.getAttribute("data-url") || "./";
		this._filterstart = this.getAttribute("data-filterstart") === "true";
		this._placeholder = this.getAttribute("data-placeholder") || "Liste filtern...";
		this._queryparam = this.getAttribute("data-queryparam") || "";

		if (this._queryparam) {
		}

		if (this._filterstart) {
			this.#hiddenlist = true;
		}

		this.addEventListener("input", this.onInput.bind(this));
		this.addEventListener("keydown", this.onEnter.bind(this));
		this.addEventListener("focusin", this.onGainFocus.bind(this));
		this.addEventListener("focusout", this.onLoseFocus.bind(this));
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data-url" && oldValue !== newValue) {
			this._url = newValue;
			this.render();
		}
		if (name === "data-filterstart" && oldValue !== newValue) {
			this._filterstart = newValue === "true";
			this.render();
		}
		if (name === "data-placeholder" && oldValue !== newValue) {
			this._placeholder = newValue;
			this.render();
		}
		if (name === "data-queryparam" && oldValue !== newValue) {
			this._queryparam = newValue;
			this.render();
		}
	}

	onInput(e) {
		if (e.target && e.target.tagName.toLowerCase() === "input") {
			this._filter = e.target.value;
			this.renderList();
		}
	}

	onGainFocus(e) {
		if (e.target && e.target.tagName.toLowerCase() === "input") {
			this.#hiddenlist = false;
			this.renderList();
		}
	}

	onLoseFocus(e) {
		let input = this.querySelector("input");
		if (e.target && e.target === input) {
			relatedElement = e.relatedTarget;
			if (relatedElement && this.contains(relatedElement)) {
				return;
			}

			input.value = "";
			this._filter = "";
			if (this._filterstart) {
				this.#hiddenlist = true;
			}
			this.renderList();
		}
	}

	onEnter(e) {
		if (e.target && e.target.tagName.toLowerCase() === "input" && e.key === "Enter") {
			e.preventDefault();
			const link = this.querySelector("a");
			if (link) {
				link.click();
			}
		}
	}

	mark() {
		if (typeof Mark !== "function") {
			return;
		}

		let list = this.querySelector("#" + FILTER_LIST_LIST);
		if (!list) {
			return;
		}

		let instance = new Mark(list.querySelectorAll("." + FILTER_LIST_SEARCHABLE));
		if (this._filter) {
			instance.mark(this._filter, {
				separateWordSearch: true,
			});
		}
	}

	// INFO: allows for setting a custom HREF of the list item
	// The function takes the item as parameter fn(item) and should return a string.
	setHREFFunc(fn) {
		this.getHREF = fn;
		this.render();
	}

	// INFO: allows for setting a custom link text of the list item
	// The function takes the item as parameter fn(item) and should return a string or
	// an HTML template literal.
	setLinkTextFunc(fn) {
		this.getLinkText = fn;
		this.render();
	}

	// INFO: allows for setting the text that will be filtered for.
	// The function takes the item as parameter fn(item) and should return a string.
	setSearchTextFunc(fn) {
		this.getSearchText = fn;
		this.render();
	}

	getHREF(item) {
		if (!item) {
			return "";
		} else if (!item.id) {
			return "";
		}
		return item.id;
	}

	getHREFEncoded(item) {
		return encodeURIComponent(this.getHREF(item));
	}

	getSearchText(item) {
		if (!item) {
			return "";
		} else if (!item.name) {
			return "";
		}
		return item.name;
	}

	#isActive(item) {
		if (!item) {
			return false;
		}

		let href = this.getHREF(item);
		if (href === "") {
			return false;
		}

		if (this._queryparam) {
			let params = new URLSearchParams(window.location.search);
			let activequery = params.get(this._queryparam) || "";
			if (activequery === href) {
				return true;
			}
		}

		if (!window.location.href.endsWith(href)) {
			return false;
		}

		return true;
	}

	getLinkText(item) {
		let text = this.getSearchText(item);
		if (text === "") {
			return ``;
		}
		return `<span class="${FILTER_LIST_SEARCHABLE}">${text}</span>`;
	}

	getURL(item) {
		if (this._queryparam) {
			let url = new URL(window.location);
			let params = new URLSearchParams(url.search);
			params.set(this._queryparam, this.getHREF(item));
			params.delete("page");
			url.search = params.toString();
			return url.toString();
		}
		return this._url + this.getHREFEncoded(item);
	}

	renderList() {
		let list = this.querySelector("#" + FILTER_LIST_LIST);
		if (list) {
			list.outerHTML = this.List();
		}
		this.mark();
	}

	render() {
		this.innerHTML = `
            <div class="font-serif text-base shadow-inner border border-stone-100">
							${this.Input()}
							${this.List()}
            </div>
        `;
		if (!htmx) return;
		htmx.process(this);
	}

	ActiveDot(item) {
		if (this.#isActive(item)) {
			return ``;
		}
		return "";
	}

	NoItems(items) {
		if (items.length === 0) {
			return `<div class="px-2 py-0.5 italic text-gray-500">Keine Einträge gefunden</div>`;
		}
		return "";
	}

	Input() {
		return `
			<div class="flex w-full py-0.5 border-b border-zinc-600 bg-stone-50">
						<i class="ri-arrow-right-s-line pl-2"></i>
						<div class="grow">
						<input
								type="text"
								placeholder="${this._placeholder}"
								class="${FILTER_LIST_INPUT} w-full placeholder:italic px-2 py-0.5" />
						</div>
				</div>
				`;
	}

	List() {
		let filtereditems = this._items;
		if (this._filter) {
			if (!this._filterstart) {
				let joins = this._filter.split(" ");
				filtereditems = this._items.filter((item) => {
					return joins.every((join) => {
						return this.getSearchText(item).toLowerCase().includes(join.toLowerCase());
					});
				});
			} else {
				filtereditems = this._items.filter((item) => {
					return this.getSearchText(item).toLowerCase().startsWith(this._filter.toLowerCase());
				});
			}
		}

		return `
							<div id="${FILTER_LIST_LIST}" class="${FILTER_LIST_LIST} pt-1 max-h-60 overflow-auto bg-stone-50 ${this.#hiddenlist ? "hidden" : ""}">
								${filtereditems
									.map(
										(item, index) => `
									<a
										href="${this.getURL(item)}"
										hx-indicator="body"
										hx-swap="outerHTML show:none"
										hx-select="main"
										hx-target="main"
										class="${FILTER_LIST_ITEM} block px-2.5 py-0.5 hover:bg-slate-200 no-underline ${
											index % 2 === 0 ? "bg-stone-100" : "bg-stone-50"
										}"
										${this.#isActive(item) ? 'aria-current="page"' : ""}>
										${this.ActiveDot(item)}
										${this.getLinkText(item)}
									</a>
								`,
									)
									.join("")}
								${this.NoItems(filtereditems)}
							</div>
				`;
	}
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

class ToolTip extends HTMLElement {
	static get observedAttributes() {
		return ["position", "timeout"];
	}

	constructor() {
		super();
		this._tooltipBox = null;
		this._timeout = 200;
		this._hideTimeout = null;
		this._hiddenTimeout = null;
	}

	connectedCallback() {
		this.classList.add(
			"w-full",
			"h-full",
			"relative",
			"block",
			"leading-none",
			"[&>*]:leading-normal",
		);
		const dataTipElem = this.querySelector(".data-tip");
		const tipContent = dataTipElem ? dataTipElem.innerHTML : "Tooltip";

		if (dataTipElem) {
			dataTipElem.classList.add("hidden");
		}

		this._tooltipBox = document.createElement("div");
		this._tooltipBox.innerHTML = tipContent;
		this._tooltipBox.className = [
			"opacity-0",
			"hidden",
			"absolute",
			"px-2",
			"py-1",
			"text-sm",
			"text-white",
			"bg-gray-900",
			"rounded",
			"shadow",
			"z-10",
			"whitespace-nowrap",
			"transition-all",
			"duration-200",
			"font-sans",
		].join(" ");

		this.appendChild(this._tooltipBox);

		this._updatePosition();

		this.addEventListener("mouseenter", () => this._showTooltip());
		this.addEventListener("mouseleave", () => this._hideTooltip());
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "position" && this._tooltipBox) {
			this._updatePosition();
		}
		if (name === "timeout" && newValue) {
			this._timeout = parseInt(newValue) || 200;
		}
	}

	_showTooltip() {
		clearTimeout(this._hideTimeout);
		clearTimeout(this._hiddenTimeout);
		this._tooltipBox.classList.remove("hidden");
		setTimeout(() => {
			this._tooltipBox.classList.remove("opacity-0");
			this._tooltipBox.classList.add("opacity-100");
		}, 16);
	}

	_hideTooltip() {
		this._hideTimeout = setTimeout(() => {
			this._tooltipBox.classList.remove("opacity-100");
			this._tooltipBox.classList.add("opacity-0");
			this._hiddenTimeout = setTimeout(() => {
				this._tooltipBox.classList.add("hidden");
			}, this._timeout + 100);
		}, this._timeout);
	}

	_updatePosition() {
		this._tooltipBox.classList.remove(
			"bottom-full",
			"left-1/2",
			"-translate-x-1/2",
			"mb-2", // top
			"top-full",
			"mt-2", // bottom
			"right-full",
			"-translate-y-1/2",
			"mr-2",
			"top-1/2", // left
			"left-full",
			"ml-2", // right
		);

		const pos = this.getAttribute("position") || "top";

		switch (pos) {
			case "bottom":
				this._tooltipBox.classList.add(
					"top-full",
					"left-1/2",
					"transform",
					"-translate-x-1/2",
					"mt-0.5",
				);
				break;
			case "left":
				this._tooltipBox.classList.add(
					"right-full",
					"top-1/2",
					"transform",
					"-translate-y-1/2",
					"mr-0.5",
				);
				break;
			case "right":
				this._tooltipBox.classList.add(
					"left-full",
					"top-1/2",
					"transform",
					"-translate-y-1/2",
					"ml-0.5",
				);
				break;
			case "top":
			default:
				// top as default
				this._tooltipBox.classList.add(
					"bottom-full",
					"left-1/2",
					"transform",
					"-translate-x-1/2",
					"mb-0.5",
				);
		}
	}
}

class PopupImage extends HTMLElement {
	constructor() {
		super();
		this.overlay = null;
		this._preview = null;
		this._description = null;
		this._imageURL = "";
		this._hideDLButton = false;
	}

	connectedCallback() {
		this.classList.add("cursor-pointer");
		this.classList.add("select-none");
		this._imageURL = this.getAttribute("data-image-url") || "";
		this._hideDLButton = this.getAttribute("data-hide-dl-button") || false;
		this._preview = this.querySelector("img");
		this._description = this.querySelector(".image-description");

		if (this._preview) {
			this._preview.addEventListener("click", () => {
				this.showOverlay();
			});
		}
	}

	disconnectedCallback() {
		// Optionally remove the overlay if the element is removed from the DOM
		if (this.overlay && this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay);
		}
	}

	showOverlay() {
		this.overlay = document.createElement("div");
		this.overlay.classList.add(
			"fixed",
			"inset-0",
			"z-50",
			"bg-black/70",
			"flex",
			"items-center",
			"justify-center",
			"p-4",
		);

		this.overlay.innerHTML = `
      <div class="relative w-max max-w-dvw max-h-dvh shadow-lg flex flex-col items-center justify-center gap-4">
				<div>
				<div class="absolute -right-16 text-white text-4xl flex flex-col">
					<button class="hover:text-gray-300 cursor-pointer focus:outline-none" aria-label="Close popup">
						<i class="ri-close-fill text-4xl"></i>
					</button>
					${this.downloadButton()}
				</div>
        <img
          src="${this._imageURL}"
          alt="Popup Image"
          class="full max-h-[80vh] max-w-[80vw] object-contain block relative ${this.descriptionImgClass()}"
        />
				${this.description()}
					</div>
      </div>
    `;

		const closeButton = this.overlay.querySelector("button");
		if (closeButton) {
			closeButton.addEventListener("click", () => {
				this.hideOverlay();
			});
		}

		this.overlay.addEventListener("click", (evt) => {
			if (evt.target === this.overlay) {
				this.hideOverlay();
			}
		});

		document.body.appendChild(this.overlay);
	}

	descriptionImgClass() {
		if (!this.description) {
			return "0";
		}
		return "";
	}

	description() {
		if (!this._description) {
			return "";
		}

		return `
        <div class="font-serif text-left description-content mt-3 text-slate-900 ">
					<div class="max-w-[80ch] hyphens-auto px-6 py-2 bg-stone-50 shadow-lg">
          ${this._description.innerHTML}
						</div>
        </div>
			`;
	}

	downloadButton() {
		if (this._hideDLButton) {
			return "";
		}

		return `
					<tool-tip position="right">
					<a href="${this._imageURL}" target="_blank" class="text-white no-underline hover:text-gray-300"><i class="ri-file-download-line"></i></a>
					<div class="data-tip">Bild herunterladen</div>
					</tool-tip>
		`;
	}

	hideOverlay() {
		this.overlay.parentNode.removeChild(this.overlay);
		this.overlay = null;
	}
}

class Tablist extends HTMLElement {
	static get observedAttributes() {}

	constructor() {
		super();
		this._showall = false;
		this.shown = -1;
		this._headings = [];
		this._contents = [];
	}

	connectedCallback() {
		this._headings = Array.from(this.querySelectorAll(".tab-list-head"));
		this._contents = Array.from(this.querySelectorAll(".tab-list-panel"));
		this.hookupEvtHandlers();
		this.hideDependent();

		if (this._headings.length === 1) {
			this.expand(0);
		}
	}

	expand(index) {
		if (index < 0 || index >= this._headings.length) {
			return;
		}

		this.shown = index;

		this._contents.forEach((content, i) => {
			if (i === index) {
				content.classList.remove("hidden");
				this._headings[i].setAttribute("aria-pressed", "true");
			} else {
				content.classList.add("hidden");
				this._headings[i].setAttribute("aria-pressed", "false");
			}
		});
	}

	hookupEvtHandlers() {
		for (let heading of this._headings) {
			heading.addEventListener("click", this.handleTabClick.bind(this));
			heading.classList.add("cursor-pointer");
			heading.classList.add("select-none");
			heading.setAttribute("role", "button");
			heading.setAttribute("aria-pressed", "false");
			heading.setAttribute("tabindex", "0");
		}

		for (let content of this._contents) {
			content.classList.add("hidden");
		}
	}

	restore() {
		for (let heading of this._headings) {
			heading.classList.add("cursor-pointer");
			heading.classList.add("select-none");
			heading.setAttribute("role", "button");
			heading.setAttribute("aria-pressed", "false");
			heading.setAttribute("tabindex", "0");
			heading.classList.remove("pointer-events-none");
			heading.classList.remove("!text-slate-900");
		}

		for (let content of this._contents) {
			content.classList.add("hidden");
		}
	}

	disable() {
		for (let heading of this._headings) {
			heading.classList.remove("cursor-pointer");
			heading.classList.remove("select-none");
			heading.removeAttribute("role");
			heading.removeAttribute("aria-pressed");
			heading.removeAttribute("tabindex");
			heading.classList.add("pointer-events-none");
			heading.classList.add("!text-slate-900");
		}
	}

	showAll() {
		this._showall = true;
		this.shown = -1;
		this.disable();
		this._contents.forEach((content, i) => {
			content.classList.remove("hidden");
			let heading = this._headings[i];
			let showopened = heading.querySelectorAll(".show-opened");
			for (let e of showopened) {
				e.classList.add("hidden");
			}
			let showclosed = heading.querySelectorAll(".show-closed");
			for (let e of showclosed) {
				e.classList.add("hidden");
			}
		});
	}

	default() {
		this._showall = false;
		this.restore();
		this.hideDependent();
	}

	hideDependent() {
		if (this.shown < 0) {
			for (const el of this._headings) {
				this._hideAllDep(el, false);
			}
		} else {
			this._headings.forEach((el, i) => {
				this._hideAllDep(el, i === this.shown);
			});
		}
	}

	_hideAllDep(element, opened) {
		const el = element.querySelectorAll(".show-closed");
		for (let e of el) {
			if (opened) {
				e.classList.add("hidden");
			} else {
				e.classList.remove("hidden");
			}
		}
		const oel = Array.from(element.querySelectorAll(".show-opened"));
		for (let e of oel) {
			if (opened) {
				e.classList.remove("hidden");
			} else {
				e.classList.add("hidden");
			}
		}
	}

	handleTabClick(event) {
		if (!event.target) {
			console.warn("Invalid event target");
			return;
		}

		const parent = this.findParentWithClass(event.target, "tab-list-head");
		if (!parent) {
			console.warn("No parent found with class 'tab-list-head'");
			return;
		}

		const index = this._headings.indexOf(parent);
		if (index === this.shown) {
			this._contents[index].classList.toggle("hidden");
			this._headings[index].setAttribute("aria-pressed", "false");
			this.shown = -1;
		} else {
			this.expand(index);
		}

		this.hideDependent();
	}

	findParentWithClass(element, className) {
		while (element) {
			if (element.classList && element.classList.contains(className)) {
				return element;
			}
			element = element.parentElement;
		}
		return null;
	}
}

class AbbreviationTooltips extends HTMLElement {
	static get observedAttributes() {
		return ["data-text", "data-abbrevmap"];
	}

	static get defaultAbbrevMap() {
		return {
			"#": "Hinweis auf weitere Informationen in der Anmerkung.",
			$: "vermutlich",
			"+++": "Inhalte aus mehreren Almanachen interpoliert",
			B: "Blatt",
			BB: "Blätter",
			C: "Corrigenda",
			Diagr: "Diagramm",
			G: "Graphik",
			"G-Verz": "Verzeichnis der Kupfer u. ä.",
			GG: "Graphiken",
			Hrsg: "Herausgeber",
			"I-Verz": "Inhaltsverzeichnis",
			Kal: "Kalendarium",
			Kr: "Karte",
			MusB: "Musikbeigabe",
			MusBB: "Musikbeigaben",
			S: "Seite",
			SS: "Seiten",
			Sp: "Spiegel",
			T: "Titel",
			TG: "Titelgraphik, Titelportrait etc",
			"TG r": "Titelgraphik, Titelportrait etc recto",
			"TG v": "Titelgraphik, Titelportrait etc verso",
			Tab: "Tabelle",
			UG: "Umschlaggraphik",
			"UG r": "Umschlaggraphik recto",
			"UG v": "Umschlaggraphik verso",
			VB: "Vorsatzblatt",
			Vf: "Verfasser",
			VrlgM: "Verlagsmitteilung",
			Vrwrt: "Vorwort",
			ar: "arabische Paginierung",
			ar1: "erste arabische Paginierung",
			ar2: "zweite arabische Paginierung",
			ar3: "dritte arabische Paginierung",
			ar4: "vierte arabische Paginierung",
			ar5: "fünfte arabische Paginierung",
			ar6: "sechste arabische Paginierung",
			ar7: "siebte arabische Paginierung",
			gA: "graphische Anleitung",
			gT: "graphischer Titel",
			gTzA: "graphische Tanzanleitung",
			nT: "Nachtitel",
			röm: "römische Paginierung",
			röm1: "erste römische Paginierung",
			röm2: "zweite römische Paginierung",
			röm3: "dritte römische Paginierung",
			röm4: "vierte römische Paginierung",
			röm5: "fünfte römische Paginierung",
			röm6: "sechste römische Paginierung",
			röm7: "siebte römische Paginierung",
			vT: "Vortitel",
			zT: "Zwischentitel",
			"§§": "Hinweis auf Mängel im Almanach (Beschädigungen, fehlende Graphiken, unvollständige Sammlungen etc) in der Anmerkung",
		};
	}

	constructor() {
		super();
		this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (oldVal !== newVal) {
			if (name === "data-abbrevmap") {
				this._parseAndSetAbbrevMap(newVal);
			}
			this.render();
		}
	}

	_parseAndSetAbbrevMap(jsonStr) {
		if (!jsonStr) {
			this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
			return;
		}
		try {
			this._abbrevMap = JSON.parse(jsonStr);
		} catch {
			this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
		}
	}

	setAbbrevMap(map) {
		if (typeof map === "object" && map !== null) {
			this._abbrevMap = map;
			this.render();
		}
	}

	get text() {
		return this.getAttribute("data-text") || "";
	}
	set text(value) {
		this.setAttribute("data-text", value);
	}

	render() {
		this.innerHTML = this.transformText(this.text, this._abbrevMap);
	}

	transformText(text, abbrevMap) {
		let result = "";
		let i = 0;

		while (i < text.length) {
			// Only match if at start of text or preceded by a boundary character
			if (i > 0 && !this.isSpaceOrPunct(text[i - 1])) {
				result += text[i];
				i++;
				continue;
			}

			const matchObj = this.findLongestAbbrevAt(text, i, abbrevMap);
			if (matchObj) {
				const { match, meaning } = matchObj;
				result += `
            <tool-tip position="top" class="!inline" timeout="300">
              <div class="data-tip p-2 text-sm text-white bg-gray-700 rounded shadow">
                ${meaning}
              </div>
              <span class="cursor-help text-blue-900 hover:text-slate-800">
                ${match}
              </span>
            </tool-tip>
          `;
				i += match.length;
			} else {
				result += text[i];
				i++;
			}
		}

		return result;
	}

	findLongestAbbrevAt(text, i, abbrevMap) {
		let bestKey = null;
		let bestLength = 0;

		for (const key of Object.keys(abbrevMap)) {
			if (text.startsWith(key, i)) {
				if (key.length > bestLength) {
					bestKey = key;
					bestLength = key.length;
				}
			}
		}

		if (bestKey) {
			return { match: bestKey, meaning: abbrevMap[bestKey] };
		}
		return null;
	}

	isSpaceOrPunct(ch) {
		// Adjust if you want a different set of punctuation recognized
		return /\s|[.,;:!?]/.test(ch);
	}
}

class IntLink extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// Basic styling to mimic a link.
		this.style.cursor = "pointer";
		this.addEventListener("click", this.handleClick);
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.handleClick);
	}

	handleClick(event) {
		const selector = this.getAttribute("data-jump");
		if (selector) {
			const target = document.querySelector(selector);
			if (target) {
				target.scrollIntoView({ behavior: "smooth" });
			} else {
				console.warn(`No element found for selector: ${selector}`);
			}
		}
	}
}

class ImageReel extends HTMLElement {
	#minWidth = 176;

	constructor() {
		super();
		this._images = [];
	}

	connectedCallback() {
		this._images = Array.from(this.querySelectorAll(".primages"));
		this.calculateShownImages();
		const rObs = new ResizeObserver((__, _) => {
			this.calculateShownImages();
		});

		this._resizeObserver = rObs;
		rObs.observe(this);
	}

	disconnectedCallback() {
		this._resizeObserver.unobserve(this);
	}

	calculateShownImages() {
		const c = this.getBoundingClientRect();
		console.log(c);
		const fits = Math.floor(c.width / (this.#minWidth + 10));
		for (let i = 0; i < this._images.length; i++) {
			if (i < fits - 1) {
				this._images[i].classList.remove("hidden");
			} else {
				this._images[i].classList.add("hidden");
			}
		}
	}
}

customElements.define(INT_LINK_ELEMENT, IntLink);
customElements.define(ABBREV_TOOLTIPS_ELEMENT, AbbreviationTooltips);
customElements.define(FILTER_LIST_ELEMENT, FilterList);
customElements.define(SCROLL_BUTTON_ELEMENT, ScrollButton);
customElements.define(TOOLTIP_ELEMENT, ToolTip);
customElements.define(POPUP_IMAGE_ELEMENT, PopupImage);
customElements.define(TABLIST_ELEMENT, Tablist);
customElements.define(FILTER_PILL_ELEMENT, FilterPill);
customElements.define(IMAGE_REEL_ELEMENT, ImageReel);

export { XSLTParseProcess, FilterList, ScrollButton, AbbreviationTooltips };
