import { Validator } from "./Validator.js";

/**
 * Represents a classroom.
 */
export class Classroom {
	/**
	 * Creates an instance of Classroom.
	 * @param {string} className - The name of the class.
	 * @param {string} subject - The subject of the class.
	 * @param {Object[]} students - The students in the class.
	 */
	constructor(className = "", subject = "", students = []) {
		this._className = Validator.validateString(className);
		this._subject = Validator.validateString(subject);
		this._students = Validator.isArrayOfObjects(students) ? students : [];
	}

	// Getters

	/**
	 * Gets the class name.
	 * @returns {string} The name of the class.
	 */
	get className() {
		return this._className;
	}

	/**
	 * Gets the subject of the class.
	 * @returns {string} The subject of the class.
	 */
	get subject() {
		return this._subject;
	}

	/**
	 * Gets the students in the class.
	 * @returns {Object[]} The students in the class.
	 */
	get students() {
		return [...this._students];
	}

	// Setters

	/**
	 * Sets the class name.
	 * @param {string} value - The new class name.
	 */
	set className(value) {
		this.className = Validator.validateString(value);
	}

	/**
	 * Sets the subject of the class.
	 * @param {string} value - The new subject.
	 */
	set subject(value) {
		this._subject = Validator.validateString(value);
	}

	/**
	 * Sets the students in the class.
	 * @param {Object[]} value - The new students.
	 * @throws Will throw an error if the value is not an array of objects.
	 */
	set students(value) {
		if (!Validator.isArrayOfObjects(value)) {
			throw new Error(
				"function: set students. Invalid input. Value must be an array of objects."
			);
		}
		this._students = value.slice();
	}

	// Methods

	/**
	 * Adds a student to the class.
	 * @param {Object} student - The student to add.
	 * @throws Will throw an error if the student is not a valid object.
	 */
	addStudent(student) {
		if (!Validator.isValidObject(student)) {
			throw new Error(
				`function: add student. Invalid student: ${
					student?.name || "Unknown"
				}) must be a non-null object`
			);
		}
		this._students.push(student);
	}

	/**
	 * Removes a student from the class by their unique ID.
	 * @param {string} studentId - The unique ID of the student to remove.
	 * @throws Will throw an error if the student is not found.
	 */
	removeStudent(studentId) {
		const index = this._students.findIndex((s) => s.uniqueId === studentId);
		if (index === -1) {
			throw new Error(
				"function: remove student. Student not found in the class."
			);
		}
		this._students.splice(index, 1);
	}
}
