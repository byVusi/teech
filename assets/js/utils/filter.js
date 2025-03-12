import { Validator } from "../classes/Validator";

export function filterByClass(arr, className) {
	if (!Validator.isValidArray(arr)) {
		throw new Error("Expected an array as the first argument.");
	}

	const validatedClassName = Validator.validateString(className);

	return sortByLastName(
		arr.filter(
			(student) =>
				student?.className && student?.className === validatedClassName
		)
	);
}

export function sortByLastName(arr = []) {
	return arr.sort((a, b) =>
		(a.lastName || "").localeCompare(b.lastName || "", undefined, {
			sensitivity: "base",
		})
	);
}
