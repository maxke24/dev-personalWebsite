class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.state = Math.floor(random(2));
	}

	show() {
		let y = this.row * res;
		let x = this.col * res;
		if (this.state === 1) {
			fill(0);
		} else {
			fill(255);
		}
		stroke(0);
		strokeWeight(1);
		rect(x, y, res, res);

		/* text(`${this.row}, ${this.col}`, x, y + 20); */
	}

	checkNeighbors(grid) {
		let total = 0;

		/* --Top row-- */
		if (this.row > 0 && this.col > 0) {
			total += grid[this.row - 1][this.col - 1].state;
		}
		if (this.row > 0) {
			total += grid[this.row - 1][this.col].state;
		}
		if (this.row > 0 && this.col < grid[0].length - 1) {
			total += grid[this.row - 1][this.col + 1].state;
		}
		/* --Sides-- */
		if (this.col > 0) {
			total += grid[this.row][this.col - 1].state;
		}
		if (this.col < grid[0].length - 1) {
			total += grid[this.row][this.col + 1].state;
		}
		/* --Bottom Row */
		if (this.row < grid.length - 1 && this.col > 0) {
			/* console.log(this.row, grid.length); */
			total += grid[this.row + 1][this.col - 1].state;
		}
		if (this.row < grid.length - 1) {
			total += grid[this.row + 1][this.col].state;
		}
		if (this.row < grid.length - 1 && this.col < grid[0].length - 1) {
			total += grid[this.row + 1][this.col + 1].state;
		}
		return total;
	}

	getFutureState(nb) {
		/*  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
		Any live cell with two or three live neighbours lives on to the next generation.
		Any live cell with more than three live neighbours dies, as if by overpopulation.
		Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. 
		*/
		/* console.log(this.row, this.col, nb); */
		if (this.state === 1) {
			if (nb < 2) {
				return 0;
			}
			if (nb === 2 || nb === 3) {
				return 1;
			}
			if (nb > 3) {
				return 0;
			}
		}

		if (this.state === 0) {
			if (nb === 3) {
				return 1;
			}
		}
		return this.state;
	}
}
