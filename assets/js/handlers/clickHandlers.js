import { Formatter } from "../classes/Formatter.js";
import { Validator } from "../classes/Validator.js";
import { runHomePage } from "../pages/HomePage.js";
import { runClassesPage } from "../pages/ClassesPage.js";
import { runStudentsPage } from "../pages/StudentsPage.js";
import { runSummaryPage } from "../pages/SummaryPage.js";
import { returnElementFromDOM } from "../utils/dom.js";

const runPages = {
	home: runHomePage,
	classes: runClassesPage,
	students: runStudentsPage,
	summary: runSummaryPage,
};

export function handleModalCloseClick() {
	document.querySelector(".modal").remove();
	document.querySelector(".modal-overlay").remove();
	document.body.style.overflow = "visible";
}

export function navigationClick() {
	document
		.querySelector("nav")
		.removeEventListener("click", navigationClickHandler);
	document
		.querySelector("nav")
		.addEventListener("click", navigationClickHandler);
}

function navigationClickHandler(e) {
	const clickedElement = e.target.closest(".nav-item");
	const page = clickedElement
		.querySelector("span")
		?.textContent.toLowerCase()
		.trim();

	if (clickedElement) setNavItemStyling(page);

	document.querySelector(
		"title"
	).textContent = `Teech | ${Formatter.capitalize(page)}`;
	document.querySelector("#page-name").textContent =
		Formatter.capitalize(page);

	const mainContainer = returnElementFromDOM(
		".main-container",
		"mainContainer not found"
	);

	Object.keys(runPages).forEach((pageName) => {
		if (pageName === page) {
			runPages[pageName]();
		}
	});
}

export function setNavItemStyling(page = "home") {
	const iconPathName = "./assets/media/icons";

	const navItems = document.querySelectorAll(".nav-item");
	const navIcons = document.querySelectorAll(".nav-icon");

	const pageName = Object.keys(runPages).filter((name) =>
		Validator.isNonEmptyString(name)
	);

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		navIcons.forEach((icon, i) => {
			icon.src = `${iconPathName}/${pageName[i]}-secondary-400.png`;
			navItems[i].classList.remove("active");

			// Style the active page nav item
			if (pageName[i] === page) {
				icon.src = `${iconPathName}/${pageName[i]}-primary-400-active.png`;
				navItems[i].classList.add("active");
			}
		});
	} else {
		navIcons.forEach((icon, i) => {
			icon.src = `${iconPathName}/${pageName[i]}-secondary-500.png`;
			navItems[i].classList.remove("active");

			// Style the active page nav item
			if (pageName[i] === page) {
				icon.src = `${iconPathName}/${pageName[i]}-primary-500-active.png`;
				navItems[i].classList.add("active");
			}
		});
	}
}
