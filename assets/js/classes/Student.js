import { User } from "./User.js";
import { Validator } from "./Validator.js";

/**
 * Represents a student.
 * @extends User
 */
export class Student extends User {
	/**
	 * Creates an instance of Student.
	 * @param {string} uniqueId - The unique ID of the student.
	 * @param {string} firstName - The first name of the student.
	 * @param {string} lastName - The last name of the student.
	 * @param {Date} dateOfBirth - The date of birth of the student.
	 * @param {string} className - The class name of the student.
	 * @param {string[]} subjects - The subjects of the student.
	 */
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

	/**
	 * Gets the class name of the student.
	 * @returns {string} The class name.
	 */
	get className() {
		return this._className;
	}

	/**
	 * Gets the subjects of the student.
	 * @returns {string[]} The subjects.
	 */
	get subjects() {
		return [...this._subjects];
	}

	// Setters

	/**
	 * Sets the class name of the student.
	 * @param {string} value - The new class name.
	 */
	set className(value) {
		this._className = Validator.validateString(value);
	}

	/**
	 * Sets the subjects of the student.
	 * @param {string[]} value - The new subjects.
	 * @throws Will throw an error if the input is not a non-empty array.
	 */
	set subjects(value) {
		if (!Validator.isNonEmptyArray(value)) {
			throw new Error(
				`function: set subjects. Invalid input: '${value}'. Expected a non-empty array.`
			);
		}

		const validSubjects = value.map(Validator.isValidString);

		this._subjects = validSubjects;
	}

	// Methods

	/**
	 * Adds a subject to the student's subjects.
	 * @param {string} value - The subject to add.
	 */
	addSubject(value) {
		this._subjects.push(Validator.validateString(value));
	}

	/**
	 * Removes a subject from the student's subjects.
	 * @param {string} value - The subject to remove.
	 * @throws Will throw an error if the subject is not found.
	 */
	removeSubject(value) {
		const index = this._subjects.indexOf(Validator.validateString(value));
		if (index === -1) {
			throw new Error(
				`function: remove subject. Invalid input. '${value}' not found`
			);
		}
		this._value.splice(index, 1);
	}
}
