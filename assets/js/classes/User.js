import { Formatter } from "./Formatter.js";
import { Validator } from "./Validator.js";
import { CONSTANTS } from "../data/CONSTANTS.js";

/**
 * Class representing a User.
 */
export class User {
	/**
	 * Create a User.
	 * @param {string} uniqueId - The unique ID of the user.
	 * @param {string} firstName - The first name of the user.
	 * @param {string} lastName - The last name of the user.
	 * @param {Date} dateOfBirth - The date of birth of the user.
	 */
	constructor(uniqueId, firstName, lastName, dateOfBirth) {
		this._uniqueId = Validator.validateString(uniqueId);
		this._firstName = Validator.validateString(
			Formatter.capitalize(firstName)
		);
		this._lastName = Validator.validateString(
			Formatter.capitalize(lastName)
		);
		this._dateOfBirth = Validator.validateDate(dateOfBirth);
		this._email = Validator.validateEmail(this.setupUserEmail());
	}

	// Getters

	/**
	 * Get the unique ID of the user.
	 * @return {string} The unique ID of the user.
	 */
	get uniqueId() {
		return this._uniqueId;
	}

	/**
	 * Get the first name of the user.
	 * @return {string} The first name of the user.
	 */
	get firstName() {
		return this._firstName;
	}

	/**
	 * Get the last name of the user.
	 * @return {string} The last name of the user.
	 */
	get lastName() {
		return this._lastName;
	}

	/**
	 * Get the full name of the user.
	 * @return {string} The full name of the user.
	 */
	get fullName() {
		return `${this._firstName} ${this._lastName}`;
	}

	/**
	 * Get the date of birth of the user.
	 * @return {string} The date of birth of the user in ISO format.
	 */
	get dateOfBirth() {
		return this._dateOfBirth.toISOString();
	}

	// Setters

	/**
	 * Set the date of birth of the user.
	 * @param {Date} value - The new date of birth.
	 */
	set dateOfBirth(value) {
		this._dateOfBirth = Validator.validateDate(value);
	}

	// Methods

	/**
	 * Update the name of the user.
	 * @param {string} field - The field to update ('firstName' or 'lastName').
	 * @param {string} newName - The new name.
	 * @throws Will throw an error if the field is not 'firstName' or 'lastName'.
	 */
	updateName(field, newName) {
		if (field !== "firstName" && field !== "lastName") {
			throw new Error(
				`Invalid field: '${field}'. Expected 'firstName' or 'lastName'.`
			);
		}

		field === "firstName"
			? (this._firstName = Validator.validateString(
					Formatter.capitalize(newName)
			  ))
			: (this._lastName = Validator.validateString(
					Formatter.capitalize(newName)
			  ));
	}

	/**
	 * Setup the user's email address.
	 * @return {string} The email address of the user.
	 * @throws Will throw an error if the user does not have a unique ID or if the school domain is invalid.
	 */
	setupUserEmail() {
		if (!this._uniqueId) {
			throw new Error(
				"function: setupUserEmail. User does not have a unique ID."
			);
		}

		if (!Validator.validateString(CONSTANTS?.schoolDomain)) {
			throw new Error("function: setupUserEmail. Invalid school domain.");
		}

		return `${this._uniqueId}@${CONSTANTS.schoolDomain}`;
	}

	/**
	 * Calculate the age of the user.
	 * @return {number} The age of the user.
	 */
	calculateAge() {
		const birthDate = this._dateOfBirth;
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		// If the current month is before the birth month or it's the birth month but the day has not yet occurred
		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}
}
