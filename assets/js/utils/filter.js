import { Validator } from "../classes/Validator";

/**
 * Sorts an array of objects by a specified criteria.
 *
 * @param {Object[]} arr - The array to sort.
 * @param {string} [criteria="lastName"] - The criteria to sort by.
 * @returns {Object[]} The sorted array.
 */
export function sortArray(arr = [], criteria = "lastName") {
	return arr.sort((a, b) =>
		(a[criteria] || "").localeCompare(b[criteria] || "", undefined, {
			sensitivity: "base",
		})
	);
}

/**
 * Filters an array of objects based on a specified criteria and sorts the result by a specified criteria.
 *
 * @param {Object[]} arr - The array to filter.
 * @param {string} [filterCriteria="className"] - The criteria to filter by.
 * @param {string} [sortCriteria="lastName"] - The criteria to sort by.
 * @returns {Object[]} The filtered and sorted array.
 * @throws {Error} If the first argument is not a valid array.
 */
export function filterArray(
	arr,
	filterCriteria = "className",
	sortCriteria = "lastName"
) {
	if (!Validator.isValidArray(arr)) {
		throw new Error("Expected an array as the first argument.");
	}

	const validatedFilterCriteria = Validator.validateString(filterCriteria);
	const validatedSortCriteria = Validator.validateString(sortCriteria);

	return sortArray(
		arr.filter(
			(student) =>
				student[filterCriteria] &&
				student[filterCriteria] === validatedFilterCriteria
		),
		validatedSortCriteria
	);
}
