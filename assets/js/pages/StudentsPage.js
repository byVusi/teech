// import { renderFilterSelect } from "../render/renderInput.js";
import { buildContainer } from "../builders/components/Containers.js";
// import { renderEmptyStudentList } from "../render/renderLists.js";
import { Validator } from "../classes/Validator.js";
import { isElementInDOM, insertContainerInDOM } from "../utils/dom.js";

/**
 * Initialises and renders the students page.
 * Sets the page name, container, filter select, student list, and floating button for the students page.
 * Also attaches an event handler to the filter select element.
 * @param {string} pageName - The name of the page to be displayed.
 */
export function runStudentsPage(pageName = "students") {
	const validatedPageName = Validator.validateString(pageName);
	insertContainerInDOM(".main-container", "list-container", buildContainer);

	if (isElementInDOM(".form-select")) {
		renderFilterSelect("container", "Select an option"); // Deal with event listener at the build stage
	}

	// const formSelect = document.querySelector(".form-select");
	// if (!formSelect) {
	// 	console.error(
	// 		"function: runStudentsPage. Form select element not found."
	// 	);
	// 	return;
	// }

	// renderEmptyStudentList();
	// renderFloatingButton(validatedPageName);
	// handleSelectChange();
}
