"use strict";
const commands = [
	"help",
	"clear (cls)",
	"exit",
	"enable dark mode (edm)",
	"enable light mode (elm)",
	"disable dark mode (ddm)",
	"disable light mode (dlm)",
	"load color palette (lp)",
	"close color palette (cp)",
	"bg (change main background)",
	"sbg (change secondary background)",
	"title",
	"subtitle",
	"text",
];

let latestCommand = [];
let commandIndex = latestCommand.length;
/* --Detecting keypress for opening terminal-- */
document.addEventListener("keyup", (event) => {
	event.preventDefault();
	const keyName = event.key;
	if (keyName === "`") {
		toggleVisibility();
	}
});

document.addEventListener("keydown", (event) => {
	inputBox.scrollIntoView();
	const keyName = event.key;
	if (!terminal.classList.contains("hidden")) {
		if (commandIndex >= 0 && latestCommand.length > 0) {
			if (keyName == "ArrowUp") {
				event.preventDefault();
				inputBox.value = latestCommand[commandIndex];
				if (commandIndex > 0) {
					commandIndex--;
				}
			}
			if (keyName == "ArrowDown") {
				event.preventDefault();
				inputBox.value = latestCommand[commandIndex];
				if (commandIndex < latestCommand.length - 1) {
					commandIndex++;
				}
			}
		}
	}
});

/* --Toggling the show and hide of the terminal-- */
const toggleVisibility = () => {
	terminal.classList.toggle("hidden");
	inputBox.focus();
};

/* --closing and clearing the terminal-- */
const closeTerminal = () => {
	clearOutput();
	toggleVisibility();
};

/* --Let user put terminal fully-- */
const fully = () => {
	terminal.style.width = "100%";
	terminal.style.height = "100%";
};

/* --Making typed input show as a stacktrace-- */
function submitCommand() {
	let command = inputBox.value;
	createTag(command);
	runCommand(command);
	inputBox.value = "";
}

const setColors = (colors, id) => {
	const [tagText, color] = checkColors(colors);
	if (color) {
		setIndividualStyling(id, color);
	}
	createTag(tagText, true);
};

async function getItems(items) {
	let itemList = {};
	await items.forEach((item) => {
		localforage.getItem(item).then((response) => {
			itemList[item] = response;
		});
	});

	return itemList;
}

function checkColors(colors) {
	let tagText, color;
	const hex = colors[0];
	if (!(colors.length > 3 || colors.length <= 0 || colors.length === 2)) {
		if (colors.length === 3) {
			const [r, g, b] = colors;
			if (r <= 255 && r >= 0 && g <= 255 && g >= 0 && b <= 255 && b >= 0) {
				color = `rgb(${r}, ${g}, ${b})`;
				tagText = `Color successfully set to rgb(${r}, ${g}, ${b})`;
			} else {
				color = null;
				tagText = `rgb values can't be higher as 255 or lower as 0`;
			}
		} else if (hex.startsWith("#")) {
			color = hex;
			tagText = `Color successfully set to ${hex}`;
		} else if (/^\d+$/.test(hex)) {
			if (hex <= 255 && hex >= 0) {
				color = `rgb(${hex}, ${hex}, ${hex})`;
				tagText = `Color successfully set to rgb(${hex}, ${hex}, ${hex})`;
			} else {
				color = null;
				tagText = `rgb values can't be higher as 255 or lower as 0`;
			}
		} else {
			color = null;
			tagText = 'The color you defined is not correct, please type "background -h" for help';
		}
	} else {
		color = null;
		tagText = 'The color you defined is not correct, please type "background -h" for help';
	}
	return [tagText, color];
}

function colorHelp(command) {
	let text = `To change the color of ${command}, please use one of the following options:
	</br>
	 0 0 0 - 255 255 255
	 </br>
	 0 - 255
	 </br>
	 #000 - #fff
	 </br>
	 #000000 - #ffffff`;
	createTag(text, true);
}

function runCommand(command) {
	let tagText;
	switch (command) {
		case "sudo":
		case "root":
			$("video").css("display", "block");
			$("video")[0].play();
			$("video").on("ended", function () {
				$("video").css("display", "none");
			});
			break;
		case "help":
			showAllCommands();
			break;
		case "clear":
		case "cls":
			clearOutput();
			break;
		case "exit":
			closeTerminal();
			break;
		case "enable light mode":
		case "disable dark mode":
		case "elm":
		case "ddm":
			lightMode();
			localforage.setItem("theme", LIGHTMODE);
			tagText = "Light mode is enabled!";
			break;
		case "disable light mode":
		case "enable dark mode":
		case "dlm":
		case "edm":
			darkMode();
			localforage.setItem("theme", DARKMODE);
			tagText = "Dark mode is enabled!";
			break;
		case "load color palette":
		case "lp":
			loadColors();
			tagText = "Color palette opened";
			break;
		case "close color palette":
		case "cp":
			closeColors();
			tagText = "Color palette closed";
			break;
		case "bg -h":
		case "background -h":
			colorHelp("background");
			break;
		case "sbg -h":
		case "secondary background -h":
			colorHelp("secondary background");
			break;
		case "title -h":
			colorHelp("title");
			break;
		case "subtitle -h":
			colorHelp("subtitle");
			break;
		case "text -h":
			colorHelp("text");
			break;
		default:
			let id;
			command.startsWith("bg")
				? (id = 0)
				: command.startsWith("sbg")
				? (id = 1)
				: command.startsWith("title")
				? (id = 2)
				: command.startsWith("subtitle")
				? (id = 3)
				: command.startsWith("text")
				? (id = 4)
				: (tagText = "Command not recognized");
			if (id || id === 0) {
				let possibleColors = command.split(" ").slice(1);
				setColors(possibleColors, id);
			}
			break;
	}

	if (tagText) {
		createTag(tagText, true);
	}
	latestCommand.push(command);
	commandIndex = latestCommand.length - 1;
	inputBox.scrollIntoView();
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
		pTag.innerHTML = `<span class="user">root@dev.jellemax.be</span>:<span class="tilde">~</span>$	` + text;
	}
	pTag.setAttribute("class", "terminal_type");
	lines.appendChild(pTag);
}

function scrollToBottom() {
	inputBox.scrollIntoView();
}
