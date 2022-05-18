'use strict';

class Node extends p5.Vector {
	constructor(x, y, color, link) {
		super(x, y);
		this.color = color;
		this.r = 30;
		this.link = link;
		this.image;
		this.activeColor;
		/* if(link){
            this.image = createImg(link, "color");
        } */
	}

	show() {
		stroke(this.color);
		if (this.activeColor) {
			stroke(this.activeColor);
		}
		strokeWeight(2);
		fill(53);
		circle(this.x, this.y, this.r);
	}
}
