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
