import { Validator } from "../classes/Validator.js";

/**
 * Creates a new HTML element with optional attributes, text content, and event listeners.
 *
 * @param {string} tagName - The tag name for the element (e.g., 'div', 'span', 'button', etc.).
 * @param {Object} [options={}] - An optional object with additional options to customize the element. The available options are:
 *   - {string} [options.text] - The text content to be set for the element.
 *   - {Object} [options.attributes] - An object containing key-value pairs for the attributes to be set on the element.
 *   - {Object} [options.events] - An object where the keys are event types (e.g., 'click', 'mouseover') and the values are event handler functions.
 *
 * @returns {HTMLElement} The created HTML element with the applied options.
 *
 * @throws {TypeError} If the tagName is not a non-empty string or is not a valid HTML tag name.
 *
 * @example
 * const button = createNewElement('button', {
 *   text: 'Click me',
 *   attributes: { class: 'btn btn-primary' },
 *   events: { click: () => alert('Button clicked!') }
 * });
 * document.body.appendChild(button);
 */
export function createNewElement(tagName, options = {}) {
	if (!Validator.isNonEmptyString(tagName)) {
		throw new TypeError("Invalid tagName. Must be a non-empty string.");
	}

	if (!Validator.isValidHtmlTagName(tagName.toLowerCase().trim()))
		throw new TypeError("Invalid tagName. Must be a valid HTML tag name.");

	const element = document.createElement(tagName);

	// If no options are provided, return the element
	if (!Validator.isNonEmptyObject(options)) return element;

	// Set the text content if valid
	if (Validator.isNonEmptyString(options.text))
		element.textContent = options.text;

	// Set attributes
	if (Validator.isNonEmptyObject(options.attributes)) {
		Object.entries(options.attributes).forEach(([key, value]) => {
			if (Validator.isNonEmptyString(key))
				element.setAttribute(key, value);
		});
	}

	// Add event listeners
	if (Validator.isNonEmptyObject(options.events)) {
		Object.entries(options.events).forEach(([event, handler]) => {
			if (
				Validator.isNonEmptyString(event) &&
				Validator.isValidFunction(handler)
			) {
				element.addEventListener(event, handler);
			} else {
				console.error(`Event listener for "${event}" is invalid.`);
			}
		});
	}

	return element;
}
