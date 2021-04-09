"use strict";

/*
 * primary
 * secondary
 * title
 * subtitle
 * text
 */

const OPTIONS = [
	["#202020ff", "#3F3F3Fff", "#ffffffff", "#ffffffff", "#707070ff"],
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

const DARKMODE = [
	"#202020ff",
	"#3F3F3Fff",
	"#ffffffff",
	"#ffffffff",
	"#707070ff",
];
const LIGHTMODE = [
	"#89ABE3FF",
	"#FCF6F5FF",
	"#20202080",
	"#20202080",
	"#20202080",
];

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

function setIndividualStyling(property, color) {
	document.documentElement.style.setProperty(property, color);
}

function setStyling(colorList) {
	document.documentElement.style.setProperty("--primary", colorList[0]);
	document.documentElement.style.setProperty("--secondary", colorList[1]);
	document.documentElement.style.setProperty("--title", colorList[2]);
	document.documentElement.style.setProperty("--subtext", colorList[3]);
	document.documentElement.style.setProperty("--text", colorList[4]);
}

$("nav").load("nav.html", () => {
	document
		.querySelectorAll("#colorChangeButtons a")
		.forEach((selected) => selected.addEventListener("click", selectStyling));
	document.querySelector("#openMenu").addEventListener("click", openNav);
	document.querySelector(".closebtn").addEventListener("click", closeNav);

	if (
		document.querySelector("body").getAttribute("data-page") !== "portfolio"
	) {
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
					scrollTop: $("#about>section").offset().top,
				},
				800
			);
		});
	}
});
