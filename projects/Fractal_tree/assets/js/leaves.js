class Leaf{
    constructor(pos){
        this.pos = pos;
        this.lifespan = 255;
        this.lifeSpeed = random(1, 6);
        this.vel = createVector();
        this.acc = createVector();
    }

    update(){
        if(this.lifespan < 40){
            let wind = createVector(random(-0.3, 0.3), random(-0.1, 0.1));
            this.applyForce(gravity);
            this.applyForce(wind);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);

        }else{
            this.lifespan -= this.lifeSpeed;

        }
    }

    show(){
        noStroke();
        fill(22, 58, this.lifespan);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }

    applyForce(f){
        this.acc.add(f);
    }
}