let w = window.innerWidth;
let h = window.innerHeight;
let circles = {};
let jsondict;
const nodes = [];
const offset = 200;
let activeCircle;

fetch('/newWebsite/assets/experiences.json')
	.then((response) => {
		return response.json();
	})
	.then((output) => {
		jsondict = output;
		setupLayers();
	});
function setup() {
	const canvas = createCanvas(w, h);
	canvas.style('z-index', '-1');
	background(53);
	frameRate(10);
	document.querySelector('a').addEventListener('click', (e) => {
		document.querySelector('article').remove();
	});
}

function setupLayers() {
	w = window.innerWidth;
	h = window.innerHeight;
	spacing = (w - 300) / 6;
	const L1 = spacing * 1;
	const L2 = spacing * 2;
	const L3 = spacing * 3;
	const L4 = spacing * 4;
	const L5 = spacing * 5;
	const L6 = spacing * 6;
	drawingContext.shadowOffsetX = 5;
	drawingContext.shadowOffsetY = 2;
	drawingContext.shadowBlur = 20;
	drawingContext.shadowColor = 'black';
	createLayer(1, L1, 'About', '#89CFF0');
	createLayer(5, L2, 'Education', '#FFD700');
	createLayer(4, L3, 'Experiences', '#FFD700');
	createLayer(4, L4, 'Projects', '#FFD700');
	createLayer(5, L5, 'Events', '#FFD700');
	createLayer(3, L6, 'Output', '#89CFF0');
}

function draw() {
	background(53);
	w = window.innerWidth;
	h = window.innerHeight;
	spacing = (w - 300) / 6;
	const L1 = spacing * 1;
	const L2 = spacing * 2;
	const L3 = spacing * 3;
	const L4 = spacing * 4;
	const L5 = spacing * 5;
	const L6 = spacing * 6;
	stroke('#8D918D');
	strokeWeight(1);
	drawLines(5, 1, L2, L1);
	drawLines(4, 5, L3, L2);
	drawLines(4, 4, L4, L3);
	drawLines(5, 4, L5, L4);
	drawLines(3, 5, L6, L5);
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].show();
	}
}

function drawLines(nodes, previousNodes, x, previousX) {
	const LHP = h / 1.5 / (previousNodes + 1);
	const LH = h / 1.5 / (nodes + 1);
	for (let i = 1; i <= previousNodes; i++) {
		for (let j = 1; j <= nodes; j++) {
			line(previousX, LHP * i + offset, x, LH * j + offset);
		}
	}
}

function createLayer(nodeAmount, x, layerPurpose, color) {
	const NH = h / 1.5 / (nodeAmount + 1);
	let p = createP(layerPurpose);
	p.position(x - p.width / 2, NH + offset - 65);
	if (layerPurpose === 'About' || layerPurpose === 'Output') {
		p.addClass('blue');
	} else {
		p.addClass('yellow');
	}
	let circ = {};
	for (let i = 1; i <= nodeAmount; i++) {
		const y = NH * i + offset;
		let imgPath = jsondict[layerPurpose][i].Link;
		let node = new Node(x, y, color, imgPath);
		let a = createA('#', '');
		a.position(x - 15, y - 15);
		nodes.push(node);
		circ[i] = node;
	}
	circles[layerPurpose] = circ;

	if (layerPurpose === 'Output') {
		let y = NH;
		let p = createP('80% Datascientist');
		p.position(w - p.width * 1.4, y + offset - p.height / 2);

		p = createP('15% Data analyst');
		p.position(w - p.width * 1.5, y * 2 + offset - p.height / 2);

		p = createP('5% Data engineer');
		p.position(w - p.width * 1.45, y * 3 + offset - p.height / 2);
	}
}

function mousePressed() {
	document.querySelectorAll('.scaled').forEach((el) => {
		el.remove();
	});
	for (let [key, value] of Object.entries(circles)) {
		for (let [key2, value2] of Object.entries(value)) {
			value2.activeColor = '';
			if (dist(mouseX, mouseY, value2.x, value2.y) < 25) {
				value2.activeColor = '#0CF574';
				const body = jsondict[key][key2];
				const el = `<h2>${body.Title}</h2><p>${body.Description}</p>`;
				createDiv(el);
				const div = document.querySelector('div');
				div.classList.add('scaled');
			}
		}
	}
}
