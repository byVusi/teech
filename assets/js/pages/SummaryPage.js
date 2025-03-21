import { buildContainer } from "../builders/components/Containers.js";
import { insertContainerInDOM } from "../utils/dom.js";
import { Validator } from "../classes/Validator.js";

/**
 * Initialises and renders the summary page.
 * Sets the page name, container, and floating button for the summary page.
 * @param {string} pageName - The name of the page to be displayed.
 */
export function runSummaryPage(pageName = "summary") {
	const validatedPageName = Validator.validateString(pageName);
	insertContainerInDOM(
		".main-container",
		"summary-container",
		buildContainer
	);

	// renderFloatingButton(validatedPageName);
}
