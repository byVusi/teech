import { createClassCard } from "../builders/components/Cards.js";
import { CONSTANTS } from "../data/CONSTANTS.js";
import { createPlaceholderText } from "../builders/components/Placeholders.js";
import { setupClassroomsFromLocalStorage } from "../data/storage.js";
import { returnElementFromDOM } from "../utils/dom.js";

/**
 * Renders class cards into the container element.
 */
export function renderClassCards() {
	const container = returnElementFromDOM(".card-container");

	if (!container) return;

	container.replaceChildren();

	const classrooms = setupClassroomsFromLocalStorage();
	if (!classrooms || classrooms.length === 0) {
		container.append(
			createPlaceholderText(CONSTANTS?.defaultPlaceholder?.noClasses) ||
				"No classes available"
		);
		return;
	}

	container.append(insertClassCardContent(classrooms));
}

/**
 * Creates and inserts class card content into a document fragment.
 *
 * @param {Array} classrooms - Array of classroom objects.
 * @returns {DocumentFragment} - Document fragment containing class cards.
 */
function insertClassCardContent(classrooms) {
	const fragment = document.createDocumentFragment();
	classrooms.forEach((cls) => {
		fragment.appendChild(
			createClassCard(
				cls.className,
				cls.subject,
				`${cls?.students.length || 0} students`
			)
		);
	});
	return fragment;
}
