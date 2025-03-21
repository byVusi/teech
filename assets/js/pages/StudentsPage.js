import { renderFilterSelect } from "../renderers/renderInput.js";
import { buildContainer } from "../builders/components/Containers.js";
// import { renderEmptyStudentList } from "../render/renderLists.js";
import { Validator } from "../classes/Validator.js";
import { insertContainerInDOM } from "../utils/dom.js";

/**
 * Initialises and renders the students page.
 * Sets the page name, container, filter select, student list, and floating button for the students page.
 * Also attaches an event handler to the filter select element.
 * @param {string} pageName - The name of the page to be displayed.
 */
export function runStudentsPage(pageName = "students") {
	const validatedPageName = Validator.validateString(pageName);
	insertContainerInDOM(".main-container", "list-container", buildContainer);
	renderFilterSelect(".main-container"); // Deal with event listener at the build stage

	// renderEmptyStudentList();
	// renderFloatingButton(validatedPageName);
	// handleSelectChange();
}
