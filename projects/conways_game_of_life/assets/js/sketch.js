"use strict";
let rows;
let cols;
let grid = [];
let nextGrid = [];
let res = 10;

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	background(255);
	cols = Math.floor(width / res);
	rows = Math.floor(height / res);
	grid = make2DArray(cols, rows);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			grid[i][j] = floor(random(2));
		}
	}
}

function draw() {
	background(0);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let x = i * res;
			let y = j * res;
			strokeWeight(1);
			if (grid[i][j] == 1) {
				fill(255);
				stroke(255);
				rect(x, y, res - 1, res - 1);
			} else {
				fill(0);
				stroke(0);
				rect(x, y, res - 1, res - 1);
			}
		}
	}
	let next = make2DArray(cols, rows);

	// Compute next based on grid
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j];
			// Count live neighbors!
			let sum = 0;
			let neighbors = countNeighbors(grid, i, j);

			if (state == 0 && neighbors == 3) {
				next[i][j] = 1;
			} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				next[i][j] = 0;
			} else {
				next[i][j] = state;
			}
		}
	}

	grid = next;
}

function checkGrid() {
	background(255);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			grid[i][j].show();
			let aliveNeighbors = grid[i][j].checkNeighbors(grid);
			let nextState = grid[i][j].getFutureState(aliveNeighbors);
			nextGrid[i][j].state = nextState;
		}
	}
	grid = nextGrid;
}

function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}
