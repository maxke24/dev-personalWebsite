"use strict";

class Node extends p5.Vector {
	constructor(x, y, color, link) {
		super(x, y);
        this.color = color;
		this.r = 30;
        this.link = link;
        this.image;
        /* if(link){
            this.image = createImg(link, "color");
        } */
	}

	show() {
		stroke(this.color);
		strokeWeight(2);
		fill(53);
		circle(this.x, this.y, this.r);
        
	}
}