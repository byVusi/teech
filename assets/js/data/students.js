import { Student } from "../classes/Student.js";
import { Validator } from "../classes/Validator.js";
import { studentData } from "./studentData.js";

export const students = studentData.map(
	(data) =>
		new Student(
			Validator.validateString(data.id),
			Validator.validateString(data.firstName),
			Validator.validateString(data.lastName),
			// Fallbak to current date if dob is invalid
			Validator.validateDate(data.dob) || new Date(),
			Validator.validateString(data.grade),
			// If subjects are valid, use them, otherwise default to 'Unknown subject'
			data.subjects.every((subject) => Validator.isValidString(subject))
				? [...data.subjects]
				: ["Unknown subject"]
		)
);
