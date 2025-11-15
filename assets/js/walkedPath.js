'use strict';

class walkedPath extends p5.Vector {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		points(x, y);
	}
}
