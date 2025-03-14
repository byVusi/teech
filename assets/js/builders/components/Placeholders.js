import { createNewElement } from "../createNewElement.js";
import { Validator } from "../../classes/Validator.js";

export function createPlaceholderText(
	text = "There is nothing to view at the moment"
) {
	const validatedText = Validator.validateString(text) || text;
	return createNewElement("p", {
		text: validatedText,
		attributes: { class: "placeholder-text" },
	});
}
