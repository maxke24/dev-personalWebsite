class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.state = Math.floor(random(2));
	}

	show() {
		let x = this.row * res;
		let y = this.col * res;
		if (this.state === 1) {
			fill(255);
		} else {
			fill(0);
		}
		stroke(0);
		strokeWeight(1);
		rect(x, y, res, res);
	}

	checkNeighbors(grid) {
		let total = 0;
		/* --Top row-- */
		if (grid[this.row - 1][this.col - 1]) {
			total += grid[this.row - 1][this.col - 1].state;
		}
		if (grid[this.row - 1][this.col]) {
			total += grid[this.row - 1][this.col].state;
		}
		if (grid[this.row - 1][this.col + 1]) {
			total += grid[this.row - 1][this.col + 1].state;
		}
		/* --Sides-- */
		if (grid[this.row][this.col - 1]) {
			total += grid[this.row][this.col - 1].state;
		}
		if (grid[this.row][this.col + 1]) {
			total += grid[this.row][this.col + 1].state;
		}
		/* --Bottom Row */
		if (grid[this.row + 1][this.col - 1]) {
			total += grid[this.row + 1][this.col - 1].state;
		}
		if (grid[this.row + 1][this.col]) {
			total += grid[this.row + 1][this.col].state;
		}
		if (grid[this.row + 1][this.col + 1]) {
			total += grid[this.row + 1][this.col + 1].state;
		}
		return total;
	}
}
