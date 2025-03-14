import { Validator } from "../classes/Validator.js";

/**
 * Checks if an element exists in the DOM.
 * @param {string} elementSelector - The selector of the element to check.
 * @returns {boolean} - True if the element exists, false otherwise.
 */
export function isElementInDOM(elementSelector) {
	if (!Validator.isValidString(elementSelector)) {
		console.error(
			"function: isElementInDOM. Element does not exist in DOM."
		);
		return false;
	}

	if (document.querySelector(elementSelector)) {
		console.error(`Element '${elementSelector}' not found.`);
		return false;
	}

	return true;
}

/**
 * Returns an element from the DOM.
 * @param {string} elementSelector - The selector of the element to return.
 * @returns {Element|null} - The DOM element if found, otherwise null.
 */
export function returnElementFromDOM(elementSelector) {
	if (!isElementInDOM(elementSelector)) {
		console.error("Cannot return a non-existant element.");
		return;
	}

	const element = document.querySelector(elementSelector);
	return element;
}

/**
 * Inserts a child element into a parent element in the DOM.
 * @param {string} parentElementSelector - The selector of the parent element.
 * @param {string} childElementSelector - The selector of the child element.
 * @param {Function} buildFunction - The function to build the child element.
 */
export function insertContainerInDOM(
	parentElementSelector,
	childElementSelector,
	buildFunction
) {
	const parentElement = returnElementFromDOM(
		Validator.validateString(parentElementSelector),
		`function: insertContainerInDom. Element '${parentElementSelector}' does not exist.`
	);

	const childElement = buildFunction(
		Validator.validateString(childElementSelector)
	);

	parentElement.append(childElement);
}
