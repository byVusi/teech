import { Validator } from "../classes/Validator.js";

export function returnElementFromDOM(elementSelector, message) {
	if (!Validator.isValidString(elementSelector)) {
		throw new Error(
			"function: checkElement. Element does not exist in DOM."
		);
	}

	const element = document.querySelector(elementSelector);

	if (!element) {
		console.error(
			Validator.validateString(message) || "Element not found."
		);
		return;
	}

	return element;
}

// Add insertContainerInDOM
