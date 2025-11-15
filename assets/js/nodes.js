'use strict';

class Node extends p5.Vector {
	constructor(x, y, color, link, a) {
		super(x, y);
		this.color = color;
		this.r = 50;
		this.link = link;
		this.image;
		this.activeColor;
		this.pos = createVector(x, y);
		this.a = a;
	}

	show() {
		stroke(this.color);
		if (this.activeColor) {
			stroke(this.activeColor);
		}
		strokeWeight(2);
		fill(22);
		circle(this.x, this.y, this.r);

	}
}
