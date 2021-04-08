"use strict";

$(document).ready(function () {
	registerServiceWorker();
	localforage.getItem("mode").then((response) => {
		response === "lightMode" ? setStyling(LIGHTMODE) : setStyling(DARKMODE);
	});

	$("#terminal").load("terminal.html", () => {
		$.getScript("assets/js/navHandling.js");
		$.getScript("assets/js/terminalFunctionality.js");
		$.getScript("assets/js/terminal.js");
		$.getScript("assets/js/dragHandler.js");
	});
});

function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/sw.js")
			.then((res) =>
				console.log(
					`successfully registered serviceWorker with scope ${res.scope}`
				)
			)
			.catch((err) => console.error("Error installing serviceWorker", err));
	}
}
