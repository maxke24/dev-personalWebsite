class Food extends p5.Vector {
	constructor() {
		let x = random(window.innerWidth - 60, window.innerWidth - 10);
		let y = random(window.innerHeight - 100, window.innerHeight - 10);
		super(x, y);
	}

	show() {
		fill(0, 0, 255);
		noStroke();
		circle(this.x, this.y, 6);
	}
}
