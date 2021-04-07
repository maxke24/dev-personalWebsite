let res = 20;
let cols;
let rows;
let grid = [];
let visited = [];
let current;
let stack = [];
function setup(){
    createCanvas(window.innerHeight, window.innerHeight);
    background(51);
    cols = Math.floor(width/res);
    rows = Math.floor(height/res);
    grid = new Array(rows);
    for (let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
    }
    visited = new Array(rows);
    for (let i = 0; i < rows; i++){
        visited[i] = new Array(cols);
    }
    for(let j = 0; j < rows; j++){
        for(let i = 0; i < cols; i++){
            grid[i][j] = new Cell(i, j);
        }
    }
    current = grid[0][0];
}

function draw(){
    background(25);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].show();

        }
    }

    current.visited = true;
    /*Step 1*/
    let next = current.checkNeighbors();
    if(next){
        next.visited = true;
        /*Step 2*/
        stack.push(current);
        /*Step 3*/
        removeWalls(current, next);
        /*Step 4*/
        current = next;
    }else{
        current = stack.pop();
    }

    fill(0, 255, 255);
    rect(current.row * res, current.col * res, res, res);
}
