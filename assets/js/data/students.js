import { Student } from "../classes/Student.js";
import { Validator } from "../classes/Validator.js";
import { studentData } from "./studentData.js";

/**
 * Transforms raw student data into an array of Student instances.
 * @type {Student[]}
 */
export const students = studentData.map(
	(data) =>
		new Student(
			/**
			 * @param {string} id - The student's ID.
			 * @param {string} firstName - The student's first name.
			 * @param {string} lastName - The student's last name.
			 * @param {Date} dob - The student's date of birth.
			 * @param {string} grade - The student's grade.
			 * @param {string[]} subjects - The student's subjects.
			 */
			Validator.validateString(data.id),
			Validator.validateString(data.firstName),
			Validator.validateString(data.lastName),
			// Fallback to current date if dob is invalid
			Validator.validateDate(data.dob) || new Date(),
			Validator.validateString(data.grade),
			// If subjects are valid, use them, otherwise default to 'Unknown subject'
			data.subjects.every((subject) => Validator.isValidString(subject))
				? [...data.subjects]
				: ["Unknown subject"]
		)
);
