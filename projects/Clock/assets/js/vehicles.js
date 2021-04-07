class Vehicle{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 6;
        this.maxSpeed = 20;
        this.maxForce = 10;
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show(){
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }

    behaviors(){
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);
        arrive.mult(1);
        flee.mult(5);
        this.applyForce(arrive);
        this.applyForce(flee);

    }

    applyForce(f){
        this.acc.add(f);
    }

    arrive(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        let speed = this.maxSpeed;
        if(d < 100){
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        if(d<50){
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }else{
            return createVector(0, 0);
        }


    }
}
