import { Validator } from "./Validator.js";

export class Formatter {
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

	static formalDate(value) {
		if (!Validator.isValidDate(value)) {
			console.error("Invalid date. Value must be a valid date string.");
			return;
		}

		const monthIndex = value.getMonth();
		const month = Validator.MONTHS_OF_THE_YEAR[monthIndex];
		const date = value.getDate();
		const year = value.getFullYear();

		return `${month} ${date}, ${year}`;
	}
}
