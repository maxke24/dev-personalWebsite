class ParticleText extends Particle{
    constructor(x, y, color, target, firework) {
        super(x, y, color, firework);
        if (target) {
            this.target = createVector(target.x, target.y);
        }
        this.maxSpeed = 10;
        this.maxForce = 5;
    }

    update() {
        if (!this.firework) {
            if (this.target) {
                let arrive = this.arrive();
                arrive.mult(1);
                this.applyForce(arrive);
            } else {
                this.applyForce(0.9);
            }
            this.lifespan -= 2;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    arrive() {
        if (!this.firework && this.target) {
            let desired = p5.Vector.sub(this.target, this.pos);
            let d = desired.mag();
            let speed = this.maxSpeed;
            if (d < 100) {
                speed = map(d, 0, 100, 0, this.maxSpeed);
            }
            desired.setMag(speed);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
    }
}
