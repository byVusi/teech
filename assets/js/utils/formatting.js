import { Validator } from "../classes/Validator.js";

export function capitilizeString(value) {
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().trim();
}

export function formatDate(value) {
	const validatedDate = Validator.validateDate(value);
	const formattedDate = validatedDate.toLocaleDateString("en-GB", {
		year: "numeric", // e.g. '2025'
		month: "long", // e.g. 'Februray'
		day: "numeric", // e.g. '9'
	});
}
