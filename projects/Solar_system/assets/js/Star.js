class Star {
	constructor() {
		this.lifeTime = 255;
		this.r = random(1, 5);
		this.pos = createVector(random(width), random(height));
	}

	update() {
		this.lifeTime -= 1;
	}

	show() {
		fill(255, this.lifeTime);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r);
	}
}
