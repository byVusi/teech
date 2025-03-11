import { User } from "./User.js";
import { Validator } from "./Validator.js";

export class Student extends User {
	constructor(
		uniqueId,
		firstName,
		lastName,
		dateOfBirth,
		className,
		subjects
	) {
		super(uniqueId, firstName, lastName, dateOfBirth);
		this._className = Validator.isNonEmptyString(className)
			? className
			: "Unknown Class";
		this._subjects = Validator.isNonEmptyArray(subjects) ? subjects : [];
	}

	// Getters
	get className() {
		return this._className;
	}

	get subjects() {
		return [...this._subjects];
	}

	// Setters
	set className(value) {
		this._className = Validator.validateString(value);
	}

	set subjects(value) {
		if (!Validator.isNonEmptyArray(value)) {
			throw new Error(
				`function: set subjects. Invalid input: '${value}'. Expected a non-empty array.`
			);
		}

		const validSubjects = value.map((subject) => {
			Validator.isValidString(subject);
		});

		this._subjects = validSubjects;
	}

	// Methods
}
