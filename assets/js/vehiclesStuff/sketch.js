"use strict";
let vehicle;
let target;
let obstacles = [];
let path;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    vehicle = new Vehicle(50, 200);
    vehicle.vel.set(3, -0.5);
    path = new Path();
    obstacles[0] = new Obstacle(300, 200, 50)
}

function mouseClicked(){
    path.addRoundPoint(mouseX, mouseY);
}

function draw() {
    background(0);
    if(path.points.length > 3){
        path.display();
        // vehicle.arrive(createVector(mouseX, mouseY));
        vehicle.edges();
        vehicle.follow(path)
        vehicle.update();
        vehicle.show();
    }

}
