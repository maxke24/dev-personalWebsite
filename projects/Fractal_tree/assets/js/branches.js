class Branch{
    constructor(begin, end, strokeWeight){
        this.begin = begin;
        this.end = end;
        this.len = begin.y - end.y;
        this.branched = false;
        this.grown = false;
        this.leaf = false;
        this.strokeWeight = strokeWeight;
    }

    update(){
        if(this.len >= 0){
            this.len -= 5;
        }else{
            this.grown = true;
        }
    }

    show(){
        let x1 = this.begin.x;
        let y1 = this.begin.y;
        let x2 = this.end.x;
        let y2 = this.end.y;
        if(this.len > 0){
            y2 = this.end.y + this.len;
        }
        stroke(255);
        strokeWeight(this.strokeWeight);
        line(x1, y1, x2, y2);
    }

    branch(mult){
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(mult * PI / 8);
        dir.mult(0.67);
        let newEnd = p5.Vector.add(this.end, dir);
        return new Branch(this.end, newEnd, strokeWeightVariable);
    }
}