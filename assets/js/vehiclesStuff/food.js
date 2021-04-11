class Food {
	constructor() {
		let x = random(window.innerWidth - 60, window.innerWidth - 10);
		let y = random(window.innerHeight - 100, window.innerHeight - 10);
		this.pos = createVector(x, y);
	}

	show() {
		fill(0, 0, 255);
		noStroke();
		circle(this.pos.x, this.pos.y, 6);
	}
}
