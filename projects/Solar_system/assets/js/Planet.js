class Planet {
	constructor(name, mass, speed, distance, color, img) {
		this.name = name;
		this.mass = mass;
		this.speed = speed / 90;
		this.distance = map(distance, 57.9, 4497.1, 40, 950);
		this.angle = 0;
		this.color = color;
		this.img = img;
		this.path = [];
	}

	update() {
		this.angle += this.speed;
	}

	show() {
		stroke(this.color);
		fill(this.color);
		r2 = map(this.mass, mercuryD, sunD, 5, 50);
		rsum = this.distance;
		x2 = x1 + rsum * cos(this.angle);
		y2 = y1 + rsum * sin(this.angle);
		ellipse(x2, y2, r2);

		// image(this.img, x2 - r2 / 2, y2 - r2 / 2, r2, r2);

		this.path.push(createVector(x2, y2));
		stroke(255, 50);
		noFill();
		beginShape();
		this.path.forEach((point) => {
			vertex(point.x, point.y);
		});
		endShape();
	}
}
