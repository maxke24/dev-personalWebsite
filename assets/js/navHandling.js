"use strict";

/*
 * primary
 * secondary
 * title
 * subtitle
 * text
 */

const OPTIONS = [
	["#202020ff", "#3F3F3Fff", "#ffffffff", "#f9a602", "#ffffff"],
	/*body---------nav--------nav text------start--------end-----------text------subtext----border*/
	/*1*/ ["#C76B98ff", "#46344eff", "#ffffffff", "#270F36ff", "#270F36ff"],
	/*2*/ ["#0063B2FF", "#46344eff", "#ffffffff", "#F6E8EAff", "#F6E8EAff"],
	/*3*/ ["#2c2b3cff", "#403f4cff", "#ffffffff", "#F6E8EAff", "#F6E8EAff"],
	/*4*/ ["#89ABE3FF", "#FCF6F5FF", "#20202080", "#20202080", "#20202080"],
	/*5*/ ["#363333ff", "#272121ff", "#ffffffff", "#ffffffff", "#ffffffff"],
	/*6*/ ["#dbedf3ff", "#404b69ff", "#ffffffff", "#20202080", "#20202080"],
	/*7*/ ["#203647ff", "#007CC7ff", "#ffffffff", "#EEFBFBff", "#EEFBFBff"],
	/*8*/ ["#202020ff", "#3F3F3Fff", "#ffffffff", "#ffffffff", "#707070ff"],
	/*9*/ ["#333D79FF", "#FAEBEFFF", "#20202080", "#ffffffff", "#ffffffff"],
	/*10*/
];

const DARKMODE = ["#202020ff", "#3F3F3Fff", "#ffffffff", "#f9a602", "#ffffff"];
const LIGHTMODE = ["#89ABE3FF", "#FCF6F5FF", "#20202080", "#20202080", "#20202080"];

function openNav() {
	document.querySelector("nav").classList.add("open");
	document.querySelector("nav").classList.remove("close");
}

function closeNav() {
	document.querySelector("nav").classList.remove("open");
	document.querySelector("nav").classList.add("close");
}

function loadColors() {
	let colorNav = document.querySelector("#colorChangeButtons");
	colorNav.innerHTML += `<a href="#" data-value="${0}">Original</a>`;
	for (let i = 1; i < OPTIONS.length; i++) {
		colorNav.innerHTML += `<a href="#" data-value="${i}">option ${i}</a>`;
	}
}

function closeColors() {
	document.querySelector("#colorChangeButtons").innerHTML = "";
}

function darkMode() {
	setStyling(DARKMODE);
}

function lightMode() {
	setStyling(LIGHTMODE);
}

function selectStyling(e) {
	e.preventDefault();
	const id = e.target.getAttribute("data-value");
	setStyling(OPTIONS[id]);
	if (window.innerWidth < 1050) {
		closeNav();
	}
}

function setIndividualStyling(index, color) {
	localforage.getItem("theme").then((response) => {
		let theme = [];
		theme = response;
		theme[index] = color;
		setStyling(theme);
	});
}

function setStyling(theme) {
	document.documentElement.style.setProperty("--primary", theme[0]);
	document.documentElement.style.setProperty("--secondary", theme[1]);
	document.documentElement.style.setProperty("--title", theme[2]);
	document.documentElement.style.setProperty("--subtext", theme[3]);
	document.documentElement.style.setProperty("--text", theme[4]);
	localforage.setItem("theme", theme);
}

$("nav").load("nav.html", () => {
	document
		.querySelectorAll("#colorChangeButtons a")
		.forEach((selected) => selected.addEventListener("click", selectStyling));
	document.querySelector("#openMenu").addEventListener("click", openNav);
	document.querySelector(".closebtn").addEventListener("click", closeNav);

	if (document.querySelector("body").getAttribute("data-page") !== "portfolio") {
		$("#home").on("click", function (event) {
			event.preventDefault();

			closeNav();
			$("html, body").animate(
				{
					scrollTop: $("body").offset().top,
				},
				800
			);
		});

		$("#about").on("click", function (event) {
			closeNav();
			$("html, body").animate(
				{
					scrollTop: $("#about_me>section").offset().top,
				},
				800
			);
		});

		$("#portfolioLink").on("click", function (event) {
			closeNav();
			$("html, body").animate(
				{
					scrollTop: $("#portfolio").offset().top,
				},
				800
			);
		});

		$("#mouse").on("click", function (event) {
			closeNav();
			$("html, body").animate(
				{
					scrollTop: $("#portfolio").offset().top,
				},
				800
			);
		});
	}
});
