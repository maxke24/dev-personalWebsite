"use strict";

let walker;

function setup() {
    createCanvas(1920, 1080);
    walker = new Walker(width / 2, height / 2);
    background(25);
}

function draw() {
    walker.update();
    walker.show();
}
