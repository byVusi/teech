import { createFilterSelect } from "../builders/components/Form.js";
import { Validator } from "../classes/Validator.js";
import { returnElementFromDOM } from "../utils/dom.js";

export function renderFilterSelect(containerClass) {
	const validatedClassName = Validator.validateString(containerClass);
	const container = returnElementFromDOM(validatedClassName);

	// Prevent duplicate filter selects
	if (!container.querySelector(".filter-select"))
		container.prepend(createFilterSelect());
}
