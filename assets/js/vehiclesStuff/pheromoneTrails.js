class PheromoneTrail {
	constructor(hasFood = false) {
		this.trail = [];
		this.isFood = hasFood;
	}

	addPheromone(x, y) {
		this.trail.push(new Pheromone(x, y, this.isFood));
	}

	show() {
		for (let i = this.trail.length - 1; i >= 0; i--) {
			let pheromone = this.trail[i];
			if (pheromone.lifespan <= 0) {
				this.trail.splice(i, i);
			}
			pheromone.show();
		}
	}
}
