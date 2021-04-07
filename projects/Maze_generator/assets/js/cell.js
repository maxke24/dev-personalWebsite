class Cell{
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.walls = [true, true, true, true]; //TOP RIGHT BOTTOM LEFT
        this.visited = false;
    }

    show(){
        let x = this.row * res;
        let y = this.col * res;

        stroke(255);
        if(this.walls[0]){
            line(x, y, x + res, y);
        }
        if(this.walls[1]){
            line(x + res, y, x+ res, y+ res);
        }
        if(this.walls[2]){
            line(x + res, y + res, x, y+ res);
        }
        if(this.walls[3]){
            line(x, y+ res, x , y);
        }
        if(this.visited){
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, res, res);

        }
    }

    checkNeighbors() {
        let neighbors = [];
        let top, right, bottom, left;
        if(this.col - 1 >= 0){
            top = grid[index(this.row)][index(this.col - 1)];
        }
        if(this.row + 1 <= rows - 1){
            right = grid[index(this.row + 1)][index(this.col)];
        }
        if(this.col + 1 <= cols - 1){
            bottom = grid[index(this.row)][index(this.col + 1)];
        }
        if(this.row - 1 >= 0){
            left = grid[index(this.row - 1)][index(this.col)];
        }
        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        if(neighbors.length > 0){
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        }else{
            return undefined
        }
    }
}

function index(index){
    if (index < 0 || index > cols - 1){
        return undefined;
    }else{
        return index;
    }
}

function removeWalls(current, next){
    let x = current.row - next.row;
    if(x === 1){
        current.walls[3] = false;
        next.walls[1] = false;
    }else if(x === - 1){
        current.walls[1] = false;
        next.walls[3] = false;
    }

    let y = current.col - next.col;
    if(y === 1){
        current.walls[0] = false;
        next.walls[2] = false;
    }else if(y === - 1){
        current.walls[2] = false;
        next.walls[0] = false;
    }
}
