"use strict";

let foodSearch = {};
let returnTrail = {};

class Ant extends p5.Vector {
	constructor(x, y, id) {
		super(x, y);
		/* this = createVector(x, y); */
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 25;
		this.maxForce = 0.05;
		this.r = 16;
		this.countDown = 100;
		this.antId = id;
		this.hasFood = false;
		this.foodTrail = new PheromoneTrail();
		this.returnTrail = new PheromoneTrail(true);
	}

	arrive(target) {
		let desired = p5.Vector.sub(target, this);
		let d = desired.mag();
		desired.normalize();

		if (d < 100) {
			let m = map(d, 0, 100, 0, this.maxSpeed);
			desired.mult(m);
		} else {
			desired.mult(this.maxSpeed);
		}

		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		this.applyForce(steer);
	}

	seek() {
		let x = random(this.x - 100, this.x + 100);
		let y = random(this.y - 100, this.y + 100);
		let target = createVector(x, y);
		let force = p5.Vector.sub(target, this);
		force.setMag(this.maxSpeed);
		force.sub(this.vel);
		force.limit(this.maxForce);
		this.applyForce(force);
		if (this.countDown <= 0) {
			if (this.hasFood) {
				this.returnTrail.addPheromone(this.x, this.y);
			} else {
				this.foodTrail.addPheromone(this.x, this.y);
			}
			this.countDown = 20;
		}
		foodSearch[this.id] = this.foodTrail;
		returnTrail[this.id] = this.returnTrail;
		this.countDown--;
	}

	follow(path) {
		let predict = this.vel.copy();
		predict.normalize();
		predict.mult(50);
		let predictLoc = p5.Vector.add(this, predict);

		let normal, target, distance;
		let worldRecord = 10000000000000000;

		for (let i = 0; i < path.points.length - 1; i++) {
			let a = path.points[i].copy();
			let b = path.points[i + 1].copy();
			let normalPoint = getNormalPoint(predictLoc, a, b);
			if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x)) {
				normalPoint = b.copy();
			}
			distance = p5.Vector.dist(normalPoint, predictLoc);
			if (distance < worldRecord) {
				worldRecord = distance;
				normal = normalPoint;

				let dir = p5.Vector.sub(b, a);
				dir.normalize();
				dir.mult(10);
				target = normalPoint.copy();
				target.add(dir);
			}
		}
		circle(target.x, target.y, 16);
		if (worldRecord > path.radius) {
			this.seek(target);
		}
	}

	edges() {
		if (this.x > width) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = width;
		}
		if (this.y > height) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = height;
		}
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.add(this.vel);
		this.acc.set(0, 0);
	}

	show() {
		stroke(255);
		strokeWeight(2);
		fill(255);
		rectMode(CENTER);
		push();
		translate(this.x, this.y);
		rotate(this.vel.heading());
		rect(0, 0, 20, 1);
		pop();
		Object.values(foodSearch).forEach((path) => {
			path.show();
		});
		Object.values(returnTrail).forEach((path) => {
			path.show();
		});
	}

	checkFoodCollision(food) {
		let search = 10;
		if (food.x >= this.x - search && food.x <= this.x + search) {
			if (food.y >= this.y - search && food.y <= this.y + search) {
				this.hasFood = true;
			}
		}
	}
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
	// Vector from a to p
	let ap = p5.Vector.sub(p, a);
	let ab = p5.Vector.sub(b, a);
	// Vector from a to b
	ab.normalize(); // Normalize the line
	// Project vector "diff" onto line by using the dot product
	ab.mult(ap.dot(ab));
	return p5.Vector.add(a, ab);
}
