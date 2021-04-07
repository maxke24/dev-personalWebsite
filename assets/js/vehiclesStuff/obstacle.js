"use strict";

class Obstacle extends p5.Vector{
    constructor(x, y, r){
        super(x, y);
        this.r = r;
    }

    show(){
        fill(127);
        stroke(255);
        strokeWeight(4)
        circle(this.x, this.y, this.r *2);
    }
}
