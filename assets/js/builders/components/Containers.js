import { createNewElement } from "../createNewElement.js";

/**
 * Creates a div element with predefined classes for the card container.
 * @returns {HTMLElement} The div element for the card container.
 */
export function buildCardContainer() {
	return createNewElement("div", ["card-container", "d-flex"]);
}

/**
 * Creates a div element for the student list container with appropriate classes.
 * @returns {HTMLElement} The div element for the student list container.
 */
export function buildStudentListContainer() {
	return createNewElement("div", ["list-container", "d-flex"]);
}

/**
 * Creates a div element for the summary container with appropriate classes.
 * @returns {HTMLElement} The div element for the summary container.
 */
export function buildSummaryContainer() {
	return createNewElement("div", ["summary-container", "d-flex"]);
}

export function buildContainer(containerClass) {
	return createNewElement("div", {
		attributes: { class: `${containerClass} d-flex` },
	});
}
