export class Validator {
	/**
	 * List of valid HTML tags.
	 * @type {string[]}
	 */
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

	/**
	 * List of months of the year.
	 * @type {string[]}
	 */
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

	/**
	 * List of days of the week.
	 * @type {string[]}
	 */
	static DAYS_OF_THE_WEEK = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	/**
	 * Checks if the value is a valid string.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a string, false otherwise.
	 */
	static isValidString(value) {
		return typeof value === "string";
	}

	/**
	 * Checks if the value is a valid array.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is an array, false otherwise.
	 */
	static isValidArray(value) {
		return Array.isArray(value);
	}

	/**
	 * Checks if the value is a valid object.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is an object, false otherwise.
	 */
	static isValidObject(value) {
		return (
			value !== null && !Array.isArray(value) && typeof value === "object"
		);
	}

	/**
	 * Checks if the value is a valid HTML element.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is an HTML element, false otherwise.
	 */
	static isValidHtmlElement(value) {
		return value instanceof HTMLElement;
	}

	/**
	 * Checks if the value is a valid HTML tag name.
	 * @param {string} value - The value to check.
	 * @returns {boolean} True if the value is a valid HTML tag name, false otherwise.
	 */
	static isValidHtmlTagName(value) {
		if (!value) {
			console.error(
				"Invalid usage of function. isValidHtmlTagName expects 1 parameter."
			);
			return false;
		}
		return this.HTML_TAGS.includes(value.toLowerCase().trim());
	}

	/**
	 * Checks if the value is a valid number.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a number, false otherwise.
	 */
	static isValidNumber(value) {
		return typeof value === "number" && !isNaN(value);
	}

	/**
	 * Checks if the value is a valid date string.
	 * @param {string} value - The value to check.
	 * @returns {boolean} True if the value is a valid date string, false otherwise.
	 */
	static isValidDate(value) {
		if (!this.isNonEmptyString(value)) {
			return false;
		}
		const date = new Date(value.trim());
		return date instanceof Date && !isNaN(date);
	}

	/**
	 * Checks if the value is a valid email address.
	 * @param {string} value - The value to check.
	 * @returns {boolean} True if the value is a valid email address, false otherwise.
	 */
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

	/**
	 * Checks if the value is a valid function.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a function, false otherwise.
	 */
	static isValidFunction(value) {
		return typeof value === "function";
	}

	/**
	 * Checks if the value is a non-empty string.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a non-empty string, false otherwise.
	 */
	static isNonEmptyString(value) {
		return this.isValidString(value) && value.trim().length > 0;
	}

	/**
	 * Checks if the value is a non-empty array.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a non-empty array, false otherwise.
	 */
	static isNonEmptyArray(value) {
		return this.isValidArray(value) && value.length > 0;
	}

	/**
	 * Checks if the value is a non-empty object.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a non-empty object, false otherwise.
	 */
	static isNonEmptyObject(value) {
		return this.isValidObject(value) && Object.keys(value).length > 0;
	}

	/**
	 * Checks if the value is a non-empty number.
	 * @param {*} value - The value to check.
	 * @returns {boolean} True if the value is a non-empty number, false otherwise.
	 */
	static isNonEmptyNumber(value) {
		return this.isValidNumber(value) && value !== 0;
	}

	/**
	 * Validates that the value is a non-empty string.
	 * @param {*} value - The value to validate.
	 * @returns {string} The validated string.
	 * @throws {TypeError} If the value is not a non-empty string.
	 */
	static validateString(value) {
		if (!this.isNonEmptyString(value)) {
			throw new TypeError("Invalid string. Must be a non-empty string.");
		}
		return value.trim();
	}

	/**
	 * Validates that the value is a non-empty array.
	 * @param {*} value - The value to validate.
	 * @returns {Array} The validated array.
	 * @throws {TypeError} If the value is not a non-empty array.
	 */
	static validateArray(value) {
		if (!this.isNonEmptyArray(value)) {
			throw new TypeError("Invalid array. Must be a non-empty array.");
		}
		return value;
	}

	/**
	 * Validates that the value is a valid object.
	 * @param {*} value - The value to validate.
	 * @param {boolean} [isEmpty=false] - Whether the object can be empty.
	 * @returns {Object} The validated object.
	 * @throws {TypeError} If the value is not a valid object or if the object is empty when isEmpty is false.
	 */
	static validateObject(value, isEmpty = false) {
		if (!this.isValidObject(value)) {
			throw new TypeError("Invalid object. Must be a valid object.");
		}

		if (!isEmpty && !this.isNonEmptyObject(value)) {
			throw new TypeError("Invalid object. Must be a non-empty object.");
		}
		return value;
	}

	/**
	 * Validates that the value is a valid date string.
	 * @param {string} value - The value to validate.
	 * @returns {Date} The validated date.
	 * @throws {TypeError} If the value is not a valid date string.
	 */
	static validateDate(value) {
		if (!this.isValidDate(value)) {
			throw new TypeError("Invalid date. Must be a valid date.");
		}
		return new Date(value);
	}

	/**
	 * Validates that the value is a valid email address.
	 * @param {string} value - The value to validate.
	 * @returns {string} The validated email address.
	 * @throws {TypeError} If the value is not a valid email address.
	 */
	static validateEmail(value) {
		if (!this.isValidEmail(value)) {
			throw new TypeError(
				"Invalid email. Must be a valid email address."
			);
		}
		return value.trim();
	}
}
