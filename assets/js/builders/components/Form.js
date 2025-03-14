import { createNewElement } from "../createNewElement.js";
import { Validator } from "../../classes/Validator.js";
import { setupClassroomsFromLocalStorage } from "../../data/storage.js";

function createFormField(
	id,
	labelText,
	{ type = "", inputTagName = "", name = "", required = true }
) {
	const label = createNewElement("label", {
		text: labelText,
		attributes: { for: id, class: "form-label" },
	});

	const input = createNewElement(inputTagName, {
		attributes: { id: id, class: `form-${inputTagName}` },
	});

	if (Validator.isNonEmptyString(type)) input.type = type;

	// Ensure inputTagName is 'select' before setting a name attribute
	if (inputTagName === "select" && Validator.isNonEmptyString(name))
		input.name = name;

	if (required) input.required = true;

	return [label, input];
}

function createSelectOptionGroup(text) {
	const group = createNewElement("optgroup");
	group.label = Validator.validateString(text);
	return group;
}

function createOptions(arr) {
	if (Validator.isNonEmptyArray(arr)) {
		console.warn(
			`function: createOptions. Empty or invalid array received: ${JSON.stringify(
				arr
			)}`
		);
		return [];
	}
	return arr.map(({ key, value }) => createSelectOption(key, value));
}

function createSelectOption(value = "", text = "Select an option") {
	const option = createNewElement("option", {
		text: text,
		attributes: {
			value: Validator.isNonEmptyString(value)
				? value.toLowerCase().replace(/\s+/g, "-")
				: "",
		},
	});
	return option;
}

export function createFilterSelect() {
	const form = createNewElement("div", { attributes: { class: "form" } });
	const [filterLabel, filterInput] = createFormField("filter", "Filter by:", {
		inputTagName: "select",
		name: "filter",
	});

	const [classGroup, subjectGroup] = [
		createSelectOptionGroup("Classes"),
		createSelectOptionGroup("Subject"),
	];

	const classrooms = setupClassroomsFromLocalStorage();
	const subjects = [...new Set(classrooms.map((cls) => cls?.subject))];

	classGroup.append(
		...createOptions(
			classrooms.map((cls) => ({
				key: cls.className,
				value: cls.className,
			}))
		)
	);

	subjectGroup.append(
		...createOptions(
			subjects.map((subject) => ({ key: subject, value: subject }))
		)
	);

	filterInput.append(createSelectOption(), classGroup, subjectGroup);
	form.append(filterLabel, filterInput);
	return form;
}
