export class Validator {
	// List of valid HTML tags
	static HTML_TAGS = [
		"a",
		"abbr",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"bdi",
		"bdo",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"cite",
		"code",
		"col",
		"colgroup",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"input",
		"ins",
		"kbd",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"map",
		"mark",
		"meta",
		"meter",
		"nav",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"small",
		"source",
		"span",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
	];

	static MONTHS_OF_THE_YEAR = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	static DAYS_OF_THE_WEEK = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// isValid
	static isValidString(value) {
		return typeof value === "string";
	}

	static isValidArray(value) {
		return Array.isArray(value);
	}

	static isValidObject(value) {
		return (
			value !== null && !Array.isArray(value) && typeof value === "object"
		);
	}

	static isValidHtmlElement(value) {
		return value instanceof HTMLElement;
	}

	static isValidHtmlTagName(value) {
		if (!value) {
			console.error(
				"Invalid usage of function. isValidHtmlTagName expects 1 parameter."
			);
			return false;
		}
		return this.HTML_TAGS.includes(value.toLowerCase().trim());
	}

	static isValidNumber(value) {
		return typeof value === "number" && !isNaN(value);
	}

	static isValidDate(value) {
		if (!this.isNonEmptyString(value)) {
			return false;
		}
		const date = new Date(value.trim());
		return date instanceof Date && !isNaN(date);
	}

	static isValidEmail(value) {
		if (!this.isNonEmptyString(value)) {
			console.error("Invalid email. Must be a non-empty string.");
			return false;
		}

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!emailRegex.test(value.trim())) {
			console.error("Invalid email. Must be a valid email address.");
			return false;
		}

		return true;
	}

	static isValidFunction(value) {
		return typeof value === "function";
	}

	// isNonEmpty
	static isNonEmptyString(value) {
		return this.isValidString(value) && value.trim().length > 0;
	}

	static isNonEmptyArray(value) {
		return this.isValidArray(value) && value.length > 0;
	}

	static isNonEmptyObject(value) {
		return this.isValidObject(value) && Object.keys(value).length > 0;
	}

	static isNonEmptyNumber(value) {
		return this.isValidNumber(value) && value !== 0;
	}

	// validate
	static validateString(value) {
		if (!this.isNonEmptyString(value)) {
			throw new TypeError("Invalid string. Must be a non-empty string.");
		}
		return value.trim();
	}

	static validateArray(value) {
		if (!this.isNonEmptyArray(value)) {
			throw new TypeError("Invalid array. Must be a non-empty array.");
		}
		return value;
	}
	static validateObject(value, isEmpty = false) {
		if (!this.isValidObject(value)) {
			throw new TypeError("Invalid object. Must be a valid object.");
		}

		if (!isEmpty && !this.isNonEmptyObject(value)) {
			throw new TypeError("Invalid object. Must be a non-empty object.");
		}
		return value;
	}

	static validateDate(value) {
		if (!this.isValidDate(value)) {
			throw new TypeError("Invalid date. Must be a valid date.");
		}
		return new Date(value);
	}

	static validateEmail(value) {
		if (!this.isValidEmail(value)) {
			throw new TypeError(
				"Invalid email. Must be a valid email address."
			);
		}
		return value.trim();
	}
}
