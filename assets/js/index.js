"use strict";

$(document).ready(function () {
	registerServiceWorker();

	$("#terminal").load("terminal.html", () => {
		$.getScript("assets/js/navHandling.js");
		$.getScript("assets/js/terminalFunctionality.js");
		$.getScript("assets/js/terminal.js");
		$.getScript("assets/js/dragHandler.min.js");
		$.getScript("assets/js/localforage.min.js").then(() => {
			localforage.getItem("theme").then((response) => {
				if (response) {
					setStyling(response);
				} else {
					const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
					userPrefersDark ? localforage.setItem("theme", DARKMODE) : localforage.setItem("theme", LIGHTMODE);
				}
			});
		});
	});
});

function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/sw.js")
			.then((res) => console.log(`successfully registered serviceWorker with scope ${res.scope}`))
			.catch((err) => console.error("Error installing serviceWorker", err));
	}
}
