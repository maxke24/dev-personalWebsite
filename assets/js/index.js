"use strict";
let img;
window.addEventListener("DOMContentLoaded", init);

function init() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;

	document.querySelectorAll("#next").forEach(btn => btn.addEventListener("click", function(e){
		e.preventDefault();
		const top = parseInt(document.querySelector(".slider #container").style.top);
		if(top){
			const newTop = top - 100;
			document.querySelectorAll(".slider #container").forEach(el => el.style.top = `${newTop}%`);
		}else{
			document.querySelectorAll(".slider #container").forEach(el => el.style.top = '-100%');
		}
		console.log("changed height");
	}));

	const experiencesSection = document.querySelector(".experiences>div");
	const projectsSection = document.querySelector(".projects>div");
	const eventsSection = document.querySelector(".events>div");
	const blogsSection = document.querySelector(".blogs>div");

	fetch("../../experiences.json")
	.then(response => {
		return response.json();
	}).then(output =>{
		const experiences = output.Experiences;
		const projects = output.projects;
		const events = output.events;
		const blogs = output.blogs;
		fillSection(experiencesSection, experiences);
		fillSection(projectsSection, projects);
		fillSection(eventsSection, events);
		fillBlogSection(blogsSection, blogs);
	});

	
}

function fillSection(section, data){
	for(const o in data){
		const el = data[o];
		const art = `<div id='container' class="${el.Class}">
						<div id='text'>
							<h4>${el.Location}</h4>
						<p>${el.Description}</p>
					</div>
					<div id='image'>
							<img alt='job' src="${el.Link}" />
					</div>
					<a id="next">Next</a>
					</div>`;
		section.innerHTML += art;
	}
}

function fillBlogSection(section, data){
	for(const o in data){
		const el = data[o];
		let tag = "";
		if(el.Link){
			tag = `<a class="blogLink" href='${el.Link}'>Bap - click here!</a>`;
		}
		console.log(el.Link);
		const art = `<div id='container' class="${el.Class}">
							<h4>${el.Location}</h4>
						<p>${el.Description} ${tag}</p>
					</div>`;

		section.innerHTML += art;
	}
}