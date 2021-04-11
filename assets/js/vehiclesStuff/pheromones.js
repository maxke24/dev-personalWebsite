class Pheromone extends p5.Vector {
	constructor(x, y, foodPheromone = "false") {
		super(x, y);
		this.lifespan = 200;
		this.foodPheromone = foodPheromone;
	}

	show() {
		this.lifespan--;
		this.foodPheromone ? fill(255, 0, 0, this.lifespan) : fill(0, 255, 0, this.lifespan);
		noStroke();
		circle(this.x, this.y, 4, 4);
	}
}
