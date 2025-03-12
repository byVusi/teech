import { Validator } from "./Validator.js";

export class Formatter {
	/**
	 * Capitalizes the first letter of a non-empty string.
	 * @param {string} value - The string to capitalize.
	 * @returns {string|undefined} The capitalized string or undefined if the input is invalid.
	 */
	static capitalize(value) {
		if (!Validator.isNonEmptyString(value.trim())) {
			console.error(
				"Invalid value. Value must be non-empty string to capitalize"
			);
			return;
		}
		return (
			value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().trim()
		);
	}

	/**
	 * Formats a valid date string into a more readable format.
	 * @param {string} value - The date string to format.
	 * @returns {string|undefined} The formatted date string or undefined if the input is invalid.
	 */
	static formalDate(value) {
		if (!Validator.isValidDate(value)) {
			console.error("Invalid date. Value must be a valid date string.");
			return;
		}

		const validatedDate = Validator.validateDate(value);
		const monthIndex = validatedDate.getMonth();
		const month = Validator.MONTHS_OF_THE_YEAR[monthIndex];
		const date = validatedDate.getDate();
		const year = validatedDate.getFullYear();

		return `${month} ${date}, ${year}`;
	}
}
