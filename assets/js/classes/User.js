import { Formatter } from "./Formatter.js";
import { Validator } from "./Validator.js";
import { CONSTANTS } from "../data/CONSTANTS.js";

export class User {
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
	get uniqueId() {
		return this._uniqueId;
	}

	get firstName() {
		return this._firstName;
	}

	get lastName() {
		return this._lastName;
	}

	get fullName() {
		return `${this._firstName} ${this._lastName}`;
	}

	get dateOfBirth() {
		return this._dateOfBirth.toISOString();
	}

	// Setters
	set dateOfBirth(value) {
		this._dateOfBirth = Validator.validateDate(value);
	}

	// Methods
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
