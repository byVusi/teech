import { Validator } from "../classes/Validator.js";
import { Formatter } from "../classes/Formatter.js";

/**
 * Retrieves and processes form values from a modal form.
 *
 * @param {Event} [e] - The event object, optional.
 * @returns {Array<string>} - An array of processed form values.
 */
export function getCreateSingleClassFormValues(e) {
	const form = document.querySelector(".modal-body .form");
	if (!form) return [];

	const inputs = form.querySelectorAll(".form-input");
	const selects = form.querySelectorAll(".form-select");

	// Collect input values
	let inputValues = [];
	inputs.forEach((input) => {
		const trimmedValue = input.value.trim();
		if (Validator.isNonEmptyString(trimmedValue)) {
			inputValues.push(Formatter.capitalize(trimmedValue));
		}
	});

	// Collect select values
	selects.forEach((select) => {
		const trimmedValue = select.value.trim();
		if (!Validator.isNonEmptyString(trimmedValue)) {
			inputValues.push(trimmedValue.toUpperCase());
		}
	});

	const pageName = document.documentElement.dataset.page;
	const numberOfInputs = pageName === "classes" ? 2 : 5; // Based on form fields

	if (inputValues.length >= numberOfInputs) {
		e?.preventDefault();
		document.querySelector("modal-body")?.replaceChildren();
		return inputValues;
	}

	return [];
}
