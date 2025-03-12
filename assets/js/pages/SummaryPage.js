import { buildContainer } from "../builders/components/Containers.js";
import { insertContainerInDOM } from "../utils/dom.js";

/**
 * Initialises and renders the summary page.
 * Sets the page name, container, and floating button for the summary page.
 * @param {string} pageName - The name of the page to be displayed.
 */
export function runSummaryPage(pageName = "summary") {
	// const validatedPageName = Validator.validateString(pageName);
	// insertPageName(validatedPageName);
	insertContainerInDOM(
		".main-container",
		"summary-container",
		buildContainer
	);
	// renderFloatingButton(validatedPageName);
}
