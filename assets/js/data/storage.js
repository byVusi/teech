import { Classroom } from "../classes/Classroom.js";
import { Student } from "../classes/Student.js";
import { classrooms } from "./classrooms.js";
import { Validator } from "../classes/Validator.js";
import { Formatter } from "../classes/Formatter.js";

/**
 * Sets up classrooms from localStorage.
 * @returns {Classroom[]} Array of Classroom instances.
 */
export function setupClassroomsFromLocalStorage() {
	try {
		const serialisedData = localStorage.getItem("classrooms");
		if (!serialisedData) {
			console.warn(
				"No data found in localStorage. Initialising default classrooms..."
			);
			saveClassroomsToLocalStorage(classrooms ? classrooms : []);
			return createClassrooms(classrooms ? classrooms : []);
		}

		const parsedData = JSON.parse(serialisedData);

		if (!Validator.isValidArray(parsedData)) {
			console.error("Invalid localStorage format.");
			return;
		}

		return createClassrooms(parsedData);
	} catch (error) {
		console.error("Error parsing localStorage data:", error);
		return createClassrooms(classrooms ? classrooms : []); // Fallback in case of error
	}
}

/**
 * Creates Classroom instances from raw data.
 * @param {Object[]} rawData - Array of raw classroom data.
 * @returns {Classroom[]} Array of Classroom instances.
 */
function createClassrooms(rawData) {
	return rawData.map((classroomData) => {
		const className = classroomData.className || "Unnamed Class";
		const subject = classroomData.subject || "Unknown Subject";

		const classroom = new Classroom(className, subject, []);

		(classroomData.students || []).forEach((studentData) => {
			const student = new Student(
				studentData.uniqueId,
				studentData.firstName,
				studentData.lastName,
				new Date(studentData.dateOfBirth),
				studentData.className,
				studentData.subjects
			);
			classroom.addStudent(student);
		});
		return classroom;
	});
}

/**
 * Saves classrooms to localStorage.
 * @param {Classroom[]} classes - Array of Classroom instances.
 */
export function saveClassroomsToLocalStorage(classes) {
	const plainObjects = classes.map((c) => ({
		className: c.className,
		subject: c.subject,
		students: c.students.map((s) => ({
			uniqueId: s.uniqueId,
			firstName: s.firstName,
			lastName: s.lastName,
			dateOfBirth: s.dateOfBirth,
			className: s.className,
			subjects: s.subjects,
		})),
	}));
	localStorage.setItem("classrooms", JSON.stringify(plainObjects));
}

/**
 * Adds a new classroom.
 * @param {string} className - Name of the classroom.
 * @param {string} subject - Subject of the classroom.
 * @returns {string} Status of the operation.
 */
export function addNewClassroom(className, subject) {
	const validatedClassName =
		Validator.validateString(className) || "Unnamed Class";
	const validatedSubject =
		Validator.validatedSubject(subject) || "Unknown Subject";

	const classroom = {
		className: validatedClassName,
		subject: validatedSubject,
		students: [],
	};

	try {
		const classData = JSON.parse(localStorage.getItem("classrooms")) || [];
		const classExists = classData.some(
			(s) =>
				s.className.toLowerCase() ===
					validatedClassName.toLowerCase() &&
				s.subject.toLowerCase() === validatedSubject.toLowerCase()
		);

		if (classExists) {
			return "danger";
		}

		classData.push(classroom);
		localStorage.setItem("classrooms", JSON.stringify(classData));
	} catch (error) {
		console.error("Error updating localStorage:", error);
		return "danger";
	}

	return "success";
}

/**
 * Adds a new student to a classroom.
 * @param {string} uniqueId - Unique ID of the student.
 * @param {string} firstName - First name of the student.
 * @param {string} lastName - Last name of the student.
 * @param {Date} dateOfBirth - Date of birth of the student.
 * @param {string} className - Name of the classroom.
 * @returns {string} Status of the operation.
 */
export function addNewStudent(
	uniqueId,
	firstName,
	lastName,
	dateOfBirth,
	className
) {
	const validatedUniqueId =
		Validator.validateString(uniqueId) || "Unknown Student Code";
	const validatedFirstName =
		Validator.validateString(firstName) || "Unknown First Name";
	const validatedLastName =
		Validator.validateString(lastName) || "Unknown Last Name";
	const validatedDateOfBirth =
		Validator.validateDate(dateOfBirth) || new Date();
	const validatedClassName = Validator.validateString(className);

	try {
		const classData = JSON.parse(localStorage.getItem("classrooms")) || [];

		const chosenClass = classData.find(
			(cls) => cls?.className === validatedClassName
		);

		if (!chosenClass) {
			console.error(`Class '${validatedClassName}' not found.`);
			return;
		}

		const subjects = chosenClass?.subject ? [chosenClass.subject] : [];
		const students = chosenClass?.students || [];

		// Create student object
		const student = {
			uniqueId: validatedUniqueId,
			firstName: validatedFirstName,
			lastName: validatedLastName,
			dateOfBirth: validatedDateOfBirth,
			className: validatedClassName,
			subjects: subjects,
		};

		// Prevent duplicate students
		const studentExists = classData
			.flatMap((cls) => cls?.students)
			.some((s) => s.uniqueId === validatedUniqueId);

		if (studentExists) {
			return "danger";
		}

		students.push(student);
		localStorage.setItem("classrooms", JSON.stringify(classData));
	} catch (error) {
		console.error("Error updating localStorage:", error);
		return "danger";
	}

	return "success";
}

/**
 * Deletes a student from classrooms.
 * @param {Classroom[]} classes - Array of Classroom instances.
 * @param {string} studentId - Unique ID of the student to be deleted.
 */
export function deleteStudent(classes, studentId) {
	const updatedClassrooms = classes.map((cls) => ({
		...cls,
		students: cls.students.filter((stu) => stu.uniqueId !== studentId),
	}));

	localStorage.setItem("classrooms", JSON.stringify(updatedClassrooms));
}

/**
 * Gets students whose birthday is today.
 * @returns {Student[]} Array of students whose birthday is today.
 */
export function getBirthdayStudents() {
	const classes = setupClassroomsFromLocalStorage();
	const students = classes.flatMap((cls) => cls?.students);
	const birthdayStudents = students.filter(
		(stu) =>
			Formatter.formatDate(stu?.dateOfBirth) ===
			Formatter.formatDate(new Date())
	);

	if (Validator.isNonEmptyArray(birthdayStudents)) return birthdayStudents;

	return [];
}

/**
 * Gets classroom data from localStorage.
 * @returns {Object[]} Array of classroom data.
 */
export function getClassroomData() {
	const classes = JSON.parse(localStorage.getItem("classrooms"));

	if (!classes) return;

	const validatedClassrooms = [];
	classes.forEach((cls) => {
		validatedClassrooms.push({
			className: cls?.className,
			subject: cls?.subject,
			students: cls?.students,
		});
	});

	return validatedClassrooms;
}
