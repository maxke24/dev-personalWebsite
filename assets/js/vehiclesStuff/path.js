"use strict";
class Path {
    constructor(){
        this.points = []
        this.radius = 20;
    }

    addPoints(x, y){
        this.points.push(createVector(x, y));
    }

    addRoundPoint(x, y){
        this.points.pop();
        this.points.push(createVector(x, y));
        this.points.push(this.points[0]);
    }

    display(){
        strokeWeight(this.radius*2);
        stroke(255, 100);
        noFill();
        beginShape();
        for(point of this.points){
            vertex(point.x, point.y);
        }
        endShape();

        strokeWeight(1)
        stroke(255)
        beginShape();
        for(point of this.points){
            vertex(point.x, point.y);
        }
        endShape();
        const index = this.points.length - 1
        circle(this.points[index].x, this.points[index].y, 16);
    }
}
