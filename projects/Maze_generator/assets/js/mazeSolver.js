let wasHere = [];
let correctPath = [];
let startX = 0;
let startY = 0;
let endX, endY;
let maze;

function solveMaze(){
    endX = cols;
    endY = rows;
    maze = grid;
    wasHere = new Array(rows);
    for (let i = 0; i < rows; i++){
        wasHere[i] = new Array(cols);
    }
    correctPath = new Array(rows);
    for (let i = 0; i < rows; i++){
        correctPath[i] = new Array(cols);
    }
    for(let i=0; i<maze.length; i++){
        for(let j= 0; j < maze[i].length; j++){
            wasHere[i][j] = false;
            correctPath[i][j] = false;
        }
        let b = recursiveSolve(startX, startY);
        console.log(b);
    }
}

function recursiveSolve(startX, startY){
    if(startX === endX && startY === endY){
        return true
    }
    if(maze[startX][startY] || wasHere[startX][startY]){
        return false
    }
    wasHere[startX][startY] = true;

    if (startY !== 0) {
        if (recursiveSolve(startX, startY-1)) { // Recalls method one up
            correctPath[startX][startY] = true;
            return true;
        }
    } // Checks if not on top edge
    if (startX !== cols - 1) {
        if (recursiveSolve(startX+1, startY)) { // Recalls method one to the right
            correctPath[startX][startY] = true;
            return true;
        }
    }// Checks if not on right edge

    if (startY !== rows - 1) {
        if (recursiveSolve(startX, startY+1)) { // Recalls method one down
            correctPath[startX][startY] = true;
            return true;
        }
    }// Checks if not on bottom edge

    if(startX !== 0){
        if(recursiveSolve(startX - 1, startY)){
            correctPath[startX][startY] = true;
            return true;
        }
    }

    return false;
}
