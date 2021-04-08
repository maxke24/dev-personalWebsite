"use strict";

const commands = [
	"help",
	"clear",
	"exit",
	"enable dark mode",
	"enable light mode",
	"disable dark mode",
	"disable light mode",
	"load color palette",
	"close color palette",
	"background-color",
	"title-color",
	"text-color",
	"nav-background-color",
	"nav-text-color",
];

/* --Detecting keypress for opening terminal-- */
document.addEventListener("keyup", (event) => {
	const keyName = event.key;
	if (keyName === "²") {
		toggleVisibility();
		clearOutput();
	}
});

/* --Toggling the show and hide of the terminal-- */
function toggleVisibility() {
	terminal.classList.toggle("hidden");
	inputBox.focus();
}

/* --closing and clearing the terminal-- */
function closeTerminal() {
	clearOutput();
	toggleVisibility();
}

/* --Let user put terminal fullscreen-- */
function fullScreen() {
	terminal.style.width = "100%";
	terminal.style.height = "100%";
}

/* --Making typed input show as a stacktrace-- */
function submitCommand() {
	let command = inputBox.value;
	createTag(command);
	runCommand(command);
	inputBox.value = "";
}

function runCommand(command) {
	if (commands.includes(command)) {
		switch (command) {
			case "help":
				showAllCommands();
				break;
			case "clear":
				clearOutput();
				break;
			case "exit":
				closeTerminal();
				break;
			case "enable light mode":
			case "disable dark mode":
				lightMode();
				localforage.setItem("mode", "lightMode");
				createTag("Light mode is enabled!", true);
				break;
			case "disable light mode":
			case "enable dark mode":
				darkMode();
				localforage.setItem("mode", "darkMode");
				createTag("Dark mode is enabled!", true);
				break;
			case "load color palette":
				loadColors();
				break;
			case "close color palette":
				closeColors();
				break;
			default:
				inputBox.value = "command recognized";
				createTag("command recognized", true);
				break;
		}
	} else {
		createTag(
			"Command not recognized, please type help to show available commands",
			true
		);
	}
}

function showAllCommands() {
	let list = document.createElement("ul");
	commands.forEach((command) => {
		let li = document.createElement("li");
		let pTag = document.createElement("p");
		pTag.innerHTML = `- ${command}`;
		li.appendChild(pTag);
		list.appendChild(li);
	});
	lines.appendChild(list);
}

function clearOutput() {
	lines.innerHTML = "";
	inputBox.value = "";
}

function createTag(text, output = false) {
	let pTag = document.createElement("p");
	if (output) {
		pTag.innerHTML = text;
	} else {
		pTag.innerHTML =
			`<span class="user">root@dev.jellemax.be</span>:<span class="tilde">~</span>$	` +
			text;
	}
	pTag.setAttribute("class", "terminal_type");
	lines.appendChild(pTag);
}
