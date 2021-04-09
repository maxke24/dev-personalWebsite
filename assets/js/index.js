"use strict";

$(document).ready(function () {
	registerServiceWorker();

	$("#terminal").load("terminal.html", () => {
		$.getScript("assets/js/navHandling.js");
		$.getScript("assets/js/terminalFunctionality.js");
		$.getScript("assets/js/terminal.js");
		$.getScript("assets/js/dragHandler.js");
		$.getScript("assets/js/localforage.js").then(() => {
			localforage.getItem("mode").then((response) => {
				if (response) {
					console.log("changed light mode based on styling option chosen");
					response === "lightMode"
						? setStyling(LIGHTMODE)
						: setStyling(DARKMODE);
				}
			});
		});
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
