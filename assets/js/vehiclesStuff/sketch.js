"use strict";
let ants = [];
let target;
let foods = [];
let path;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight); /* 
	ant = new Ant(50, 200);
	ant.vel.set(3, -0.5); */
	path = new Path();
	for (let i = 0; i < 50; i++) {
		foods.push(new Food());
	}

	for (let i = 0; i < 200; i++) {
		ants.push(new Ant(50, 200, i));
	}
}

function mouseClicked() {
	path.addRoundPoint(mouseX, mouseY);
}

function draw() {
	background(0);
	if (path.points.length > 3) {
		path.display();
		ant.follow(path);
	}

	foods.forEach((food) => {
		food.show();
	});
	ants.forEach((ant) => {
		ant.seek();
		ant.edges();
		ant.update();
		ant.show();
	});
}
