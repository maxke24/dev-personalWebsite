"use strict";

const OPTIONS = [
	[
		"#202020ff",
		"#3F3F3Fff",
		"#ffffffff",
		"#202020ff",
		"#3F3F3Fff",
		"#ffffffff",
		"#707070ff",
		"#FFDf6C",
	],
	/*body---------nav--------nav text------start--------end-----------text------subtext----border*/
	/*1*/ [
		"#C76B98ff",
		"#46344eff",
		"#ffffffff",
		"#D3D3D3ff",
		"#D3D3D3ff",
		"#270F36ff",
		"#270F36ff",
		"#b76d68",
	],
	/*2*/ [
		"#0063B2FF",
		"#46344eff",
		"#ffffffff",
		"#9CC3D5FF",
		"#9CC3D5FF",
		"#F6E8EAff",
		"#F6E8EAff",
		"none",
	],
	/*3*/ [
		"#2c2b3cff",
		"#403f4cff",
		"#ffffffff",
		"#121420ff",
		"#1b2432ff",
		"#F6E8EAff",
		"#F6E8EAff",
		"#b76d68",
	],
	/*4*/ [
		"#89ABE3FF",
		"#FCF6F5FF",
		"#20202080",
		"#FCF6F5FF",
		"#FCF6F5FF",
		"#20202080",
		"#20202080",
		"#b76d68",
	],
	/*5*/ [
		"#363333ff",
		"#272121ff",
		"#ffffffff",
		"#f6e9e9ff",
		"#f6e9e991",
		"#ffffffff",
		"#ffffffff",
		"#e16428",
	],
	/*6*/ [
		"#dbedf3ff",
		"#404b69ff",
		"#ffffffff",
		"#404b69ff",
		"#283149ff",
		"#20202080",
		"#20202080",
		"#e16428ff",
	],
	/*7*/ [
		"#203647ff",
		"#007CC7ff",
		"#ffffffff",
		"#007CC7ff",
		"#4DA8DAff",
		"#EEFBFBff",
		"#EEFBFBff",
		"#12232E",
	],
	/*8*/ [
		"#202020ff",
		"#3F3F3Fff",
		"#ffffffff",
		"#202020ff",
		"#3F3F3Fff",
		"#ffffffff",
		"#707070ff",
		"#FFDf6C",
	],
	/*9*/ [
		"#333D79FF",
		"#FAEBEFFF",
		"#20202080",
		"#FAEBEFFF",
		"#FAEBEFFF",
		"#ffffffff",
		"#ffffffff",
		"#b76d68",
	],
	/*10*/
];

const DARKMODE = [
	"#202020ff",
	"#3F3F3Fff",
	"#ffffffff",
	"#202020ff",
	"#3F3F3Fff",
	"#ffffffff",
	"#707070ff",
	"#FFDf6C",
];
const LIGHTMODE = [
	"#89ABE3FF",
	"#FCF6F5FF",
	"#20202080",
	"#FCF6F5FF",
	"#FCF6F5FF",
	"#20202080",
	"#20202080",
	"#b76d68",
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
	document.documentElement.style.setProperty("--nav", colorList[1]);
	document.documentElement.style.setProperty("--nav-text", colorList[2]);
	document.documentElement.style.setProperty("--start-gradient", colorList[3]);
	document.documentElement.style.setProperty("--end-gradient", colorList[4]);
	document.documentElement.style.setProperty("--headers", colorList[5]);
	document.documentElement.style.setProperty("--subText", colorList[6]);
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
