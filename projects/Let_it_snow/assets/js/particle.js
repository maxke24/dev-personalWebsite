class Particle{
    constructor(){
        this.pos = createVector(random(width), -100);
        this.vel = createVector(0, random(0.1, 5));
        this.acc = createVector(0, 0.1);
        this.stroke = map(this.vel.y, 0.1, 5, 2, 5);
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show(){
        stroke(255);
        strokeWeight(this.stroke);
        point(this.pos.x, this.pos.y);
    }

    offScreen(){
            return this.pos.y > height;
    }
}