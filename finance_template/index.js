"use strict";
let salarissen;
document.addEventListener("DOMContentLoaded", init);

function init() {
	salarissen = document.querySelectorAll("#salarissen input");
}

function getPayAmount() {
	let total = 0;
	salarissen.forEach((el) => {
		if (el.value) {
			console.log(parseInt(el.value));
			total += parseInt(el.value);
		}
	});
	return total;
}

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");
		let content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	});
}
