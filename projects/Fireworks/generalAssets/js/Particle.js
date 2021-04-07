class Particle {
    constructor(x, y, color, firework) {
        this.pos = createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;
        this.color = color;
        if (this.firework) {
            this.vel = createVector(0, random(-5, -15));

        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(1, 10));

        }
        this.acc = createVector(0, 0.1);
    }

    done() {
        return this.lifespan < 0;
    }

    update() {
        if (!this.firework) {
            this.applyForce(gravity);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        if (!this.firework) {
            strokeWeight(5);
            stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.color[0], this.color[1], this.color[2]);
        }
        point(this.pos.x, this.pos.y);
    }
}
