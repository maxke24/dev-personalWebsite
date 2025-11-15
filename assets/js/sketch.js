let w = window.innerWidth;
let h = window.innerHeight;
let circles = {};
let jsondict;
const nodes = [];
let activeCircle;

let anchor;
let velocity;
let restLength = 10;
let k = 0.1;
let gravity;
let max = 1;
let dots = [];
/* let walkerx, walkery;

let points = [] */

const colors = { blue: '#89cff0', yellow: '#ffd700' };

function preload() {
	fetch('/assets/experiences_new.json')
		.then((response) => {
			return response.json();
		})
		.then((output) => {
			jsondict = output;
			Object.keys(jsondict).forEach((key) => {
				if (Object.keys(jsondict[key]).length > max) {
					max = Object.keys(jsondict[key]).length;
				}
			});
			setupLayers();
		});
}

function setup() {
	const canvas = createCanvas(w, h);
	canvas.style('z-index', '-1');
	background(22);
	frameRate(240);
	document.querySelector('a').addEventListener('click', (e) => {
		document.querySelector('article').remove();
	});
	gravity = createVector(0, 0.1);
}

function setupLayers() {
	spacing = w / 1.5 / max;
	drawingContext.shadowOffsetX = 3;
	drawingContext.shadowOffsetY = 1;
	drawingContext.shadowBlur = 5;
	drawingContext.shadowColor = '#16161616';
	let i = 1;
	Object.keys(jsondict).forEach((key) => {
		const layerSpacing = spacing * i;
		createLayer(layerSpacing, key);
		i += 1;
	});
}

function draw() {
	background(22);
	spacing = (w - 300) / 6;
	stroke('#535353');
	strokeWeight(1);
	drawLinesNew();
	for (let i = 0; i < nodes.length; i++) {
		updateNode(nodes[i]);
	}
}

function updateNode(node) {
	if (!document.querySelector('article')) {
		for (let i = 0; i < nodes.length; i++) {
			velocity = createVector(0, 0);
			const node = nodes[i];
			if (dist(mouseX, mouseY, node.x, node.y) < 25) {
				anchor = createVector(540, 300);
				let mapValue = random(0.5, 2);
				diffX = map(
					mouseX,
					node.x - 25,
					node.x + 25,
					-mapValue * 5,
					mapValue * 5
				);
				diffY = map(
					mouseY,
					node.y - 25,
					node.y + 25,
					-mapValue * 5,
					mapValue * 5
				);
				node.x += diffX;
				node.y += diffY;
				if(node.r <= 55){
					node.r += 0.05;
				}
			}else{
				if(node.r >= 50){
					node.r -= 0.05;
				}
			}
			let force = p5.Vector.sub(
				node,
				createVector(node.pos.x, node.pos.y - restLength)
			);
			let x = force.mag() - restLength;
			force.normalize();
			force.mult(-1 * k * x);

			// F = A
			velocity.add(force);
			velocity.add(gravity);
			node.add(velocity);
			velocity.mult(0.99);
		}
	}
	node.show();
}

function drawLinesNew() {
	let i = 1;
	for (let [key, value] of Object.entries(circles)) {
		if (i < Object.keys(circles).length) {
			let tempNodes = Object.values(circles)[i];
			for (let [key1, value1] of Object.entries(value)) {
				for (let [key2, value2] of Object.entries(tempNodes)) {
					line(value1.x, value1.y, value2.x, value2.y);
				}
			}
		}
		i++;
	}
}

function createLayer(x, layerPurpose) {
	const l = Object.keys(jsondict[layerPurpose]).length;
	let half = (l + 1) / 2;
	let offset = 100;
	let py = h / 2 - offset * abs(half - 1) - 75;
	let color;
	const currentIndex = Object.keys(jsondict).indexOf(layerPurpose);
	const lastIndex = Object.keys(jsondict).length - 1;
	currentIndex === 0 || currentIndex === lastIndex
		? (color = 'blue')
		: (color = 'yellow');
	let p = createP(layerPurpose);
	p.position(x - p.width / 1.1, py);
	p.addClass(color);
	let circ = {};
	let y;
	for (let i = 1; i <= l; i++) {
		if (i == half) {
			y = h / 2;
		} else if (i < half) {
			y = h / 2 - offset * abs(half - i);
		} else {
			y = h / 2 + offset * abs(half - i);
		}
		let imgPath = jsondict[layerPurpose][i].Link;
		let a = createA(`${layerPurpose}`, '');
		a.position(x - 25, y - 25);
		let node = new Node(x, y, colors[color], imgPath, a);
		nodes.push(node);
		circ[i] = node;
	}
	circles[layerPurpose] = circ;
}

function mousePressed() {
	if (!document.querySelector('.scaled')) {
		for (let [key, value] of Object.entries(circles)) {
			for (let [key2, value2] of Object.entries(value)) {
				value2.activeColor = '';
				if (
					dist(mouseX, mouseY, value2.x, value2.y) < 25 &&
					!document.querySelector('article')
				) {
					value2.activeColor = '#64b6ac';
					const body = jsondict[key][key2];
					addBody(body, value2.x, value2.y);
				}
			}
		}
	}
}

function addBody(body, x, y) {
	let el = `<h2>${body.Title}</h2><p>${body.Description}</p><a>Close</a>`;
	if (body.Link) {
		el = `<h2>${body.Title}</h2><p>${body.Description} <a target="_blank" id='socials' rel=”noopener” class='link' href="${body.Link}">Click here!</a></p><a class='close'>Close</a>`;
	}
	const div = createDiv(el);
	
	/* div.elt.className = 'scaled'; */
	/* const div = document.querySelector('div'); */
	div.style.left = `${x - div.width / 2}px`;
	div.style.top = `${y - div.height / 2}px`;
	/* div.style.position = `absolute`; */
	div.elt.classList.add('scaled');
	div.elt.childNodes[2].addEventListener('click', () => {
		document.querySelectorAll('.scaled').forEach((el) => {
			el.remove();
		});
	});
}



/* function randomWalker() {
	for(let i = 0; i < points.length; i++){

		let x = points[i].x
		let y = points[i].y
		point(x, y);
		const r = floor(random(4));
		switch (r) {
			case 0:
				x = x + 1;
				break;
				case 1:
					x = x - 1;
					break;
					case 2:
						y = y + 1;
						break;
						case 3:
							y = y - 1;
							break;
						}
						walkerx = x
						walkery = y
					}
  } */