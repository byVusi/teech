// import { renderClassCards } from "../render/renderCards.js";
import { buildContainer } from "../builders/components/Containers.js";
import { Validator } from "../classes/Validator.js";
import { isElementInDOM, insertContainerInDOM } from "../utils/dom.js";

/**
 * Initialises and renders the classes page.
 * Sets up the page name, container, cards, and floating button, and attaches event listeners.
 * @param {string} pageName - The name of the page to be displayed.
 */
export function runClassesPage(pageName = "classes") {
	const validatedPageName = Validator.validateString(pageName);

	if (isElementInDOM(".main-container")) {
		insertContainerInDOM(
			".main-container",
			"card-container",
			buildContainer
		);
	}

	// insertPageName(validatedPageName);

	// renderClassCards(); // Deal with event listener at the card build

	// Ensure class cards are rendered before attaching event listeners
	// const renderedCards = mainContainer.querySelectorAll(".card");
	// if (renderedCards.length === 0) {
	// 	console.error("function: runClassesPage. No class cards rendered.");
	// 	return;
	// }

	// renderFloatingButton(validatedPageName);
	// handleClassCardClick();
}
