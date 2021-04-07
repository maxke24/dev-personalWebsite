let r1, x1, y1;
let r2, x2, y2;
let rsum;
let angle;
let sunD = 1392000;
let mercuryD = 4879.4;
let marsD = 6779;
let venusD = 12104;
let earthD = 12742;
let neptuneD = 49244;
let uranusD = 50724;
let saturnD = 116460;
let jupiterD = 139820;
let scaleSize = 1;
let x = 0;
let y = 0;

// let sunImgPath = "assets/media/sun.svg";
// let mercuryImgPath = "assets/media/mercury.svg";
// let marsImgPath = "assets/media/mars.svg";
// let venusImgPath = "assets/media/venus.svg";
// let earthImgPath = "assets/media/earth.svg";
// let neptuneImgPath = "assets/media/neptune.svg";
// let uranusImgPath = "assets/media/uranus.svg";
// let saturnImgPath = "assets/media/saturn.svg";
// let jupiterImgPath = "assets/media/jupiter.svg";

let sunImg,
	mercuryImg,
	marsImg,
	venusImg,
	earthImg,
	neptuneImg,
	uranusImg,
	saturnImg,
	jupiterImg;

let planets = [];
let stars = [];

let ctx;

function preload() {
	// sunImg = loadImage(sunImgPath);
	// mercuryImg = loadImage(mercuryImgPath);
	// marsImg = loadImage(marsImgPath);
	// venusImg = loadImage(venusImgPath);
	// earthImg = loadImage(earthImgPath);
	// neptuneImg = loadImage(neptuneImgPath);
	// uranusImg = loadImage(uranusImgPath);
	// saturnImg = loadImage(saturnImgPath);
	// jupiterImg = loadImage(jupiterImgPath);
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(25);
	strokeWeight(1);
	noFill();
	stroke(255);
	r1 = 50;
	x1 = width / 2;
	y1 = height / 2;
	angle = 0;

	angleMode(DEGREES);
	planets.push(
		new Planet("Mercury", mercuryD, 47.4, 57.9, [191, 144, 114], mercuryImg)
	);
	planets.push(
		new Planet("Venus", venusD, 35.0, 108.2, [191, 144, 114], venusImg)
	);
	planets.push(
		new Planet("Earth", earthD, 29.8, 149.6, [109, 203, 231], earthImg)
	);
	planets.push(
		new Planet("Mars", marsD, 24.6, 227.9, [109, 203, 231], marsImg)
	);
	planets.push(
		new Planet("Jupiter", jupiterD, 13.1, 778.3, [228, 182, 132], jupiterImg)
	);
	planets.push(
		new Planet("Saturn", saturnD, 9.7, 1427, [255, 243, 159], saturnImg)
	);
	planets.push(
		new Planet("Uranus", uranusD, 6.8, 2871, [255, 243, 159], uranusImg)
	);
	planets.push(
		new Planet("Neptune", neptuneD, 5.4, 4497.1, [255, 243, 159], neptuneImg)
	);
}

function draw() {
	translate(x, y);
	scale(scaleSize);
	background(25);
	stroke(255, 201, 67);
	fill(255, 201, 67);
	// image(sunImg, x1 - r1 / 2, y1 - r1 / 2, r1, r1);
	circle(x1, y1, r1, r1);
	planets.forEach((planet) => {
		planet.update();
		planet.show();
	});

	if (random() < 0.2) {
		stars.push(new Star());
	}

	for (let i = stars.length - 1; i >= 0; i--) {
		stars[i].update();
		stars[i].show();
		if (stars[i].lifeTime <= 0) {
			stars.splice(i, 1);
		}
	}
}
