import { Validator } from "../classes/Validator.js";

export function configureAppUser(user) {
	const profileNameElement = document.querySelector("#user-name");
	if (profileNameElement) {
		profileNameElement.textContent =
			Validator.isNonEmptyObject(user) &&
			Validator.isNonEmptyString(user.firstName?.trim())
				? user.firstName
				: "Teacher";
	}
}
