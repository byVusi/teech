import { createNewElement } from "../createNewElement.js";
import { Validator } from "../../classes/Validator.js";
import { Formatter } from "../../classes/Formatter.js";
// import { CONSTANTS } from "../../data/CONSTANTS.js";

/**
 * Creates a new card element.
 * @returns {HTMLElement} The card element.
 */
function createCard() {
	return createNewElement("div", { attributes: { class: "card" } });
}

/**
 * Creates a new card text element with the specified text and tag name.
 * @param {string} text - The text content for the card text element.
 * @param {string} [tagName="h5"] - The tag name for the card text element.
 * @returns {HTMLElement} The card text element.
 */
function createCardText(text, tagName = "h5") {
	const validatedText = Validator.validateString(text.trim());
	const allowedTags = ["h5", "h6", "span", "a"];
	const validatedTagName = allowedTags.includes(tagName.toLowerCase().trim())
		? tagName.toLowerCase().trim()
		: "h5";

	const cardText = createNewElement(tagName);
	cardText.classList.add(
		validatedTagName === "h6"
			? "card-subtitle"
			: validatedTagName === "span"
			? "card-label"
			: validatedTagName === "a"
			? "card-link"
			: "card-title"
	);

	cardText.textContent = validatedText;
	return cardText;
}

/**
 * Creates a new class card element with the specified title, subtitle, and label.
 * @param {string} [title="Class Name"] - The title for the class card.
 * @param {string} [subtitle="Subject"] - The subtitle for the class card.
 * @param {string} [label="Number of students"] - The label for the class card.
 * @returns {HTMLElement} The class card element.
 */
export function createClassCard(
	title = "Class Name",
	subtitle = "Subject",
	label = "Number of students"
) {
	const card = createCard();
	if (title) card.append(createCardText(title.toUpperCase()));
	if (subtitle)
		card.append(createCardText(Formatter.capitalize(subtitle), "h6"));
	if (label) card.append(createCardText(Formatter.capitalize(label), "span"));
	return card;
}
