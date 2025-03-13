import { Validator } from "../classes/Validator.js";

export function returnElementFromDOM(elementSelector) {
	if (!isElementInDOM(elementSelector)) {
		console.error("Cannot return a non-existant element.");
		return;
	}

	const element = document.querySelector(elementSelector);
	return element;
}

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
