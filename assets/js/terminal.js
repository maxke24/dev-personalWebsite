"use strict";
let terminalBox, header, inputBox, lines, minimize, close, fully;

terminalBox = document.querySelector("#terminal");
inputBox = document.querySelector("#type_input");
lines = document.querySelector("#lines");
fully = document.querySelector("#fully");
minimize = document.querySelector("#minimize");
close = document.querySelector("#close");

inputBox.addEventListener("keyDown", (e) => {
	const keyName = e.key;
	if (keyName === "ArrowUp" || keyName === "ArrowDown") {
		e.preventDefault();
	}
});
minimize.addEventListener("click", toggleVisibility);
close.addEventListener("click", closeTerminal);
fully.addEventListener("click", fully);
