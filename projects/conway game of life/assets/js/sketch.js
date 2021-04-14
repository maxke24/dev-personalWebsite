"use strict";
let rows;
let cols;
let grid = [];
let nextGrid = [];
let res = 20;

function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	background(255);
	cols = Math.floor(width / res);
	rows = Math.floor(height / res);
	grid = new Array(rows);
	nextGrid = new Array(rows);
	for (let i = 0; i < rows; i++) {
		grid[i] = new Array(cols);
		nextGrid[i] = new Array(cols);
	}
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let cell = new Cell(i, j);
			grid[i][j] = cell;
		}
	}
}

function draw() {
	background(255);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
	noLoop();
}
