let w = window.innerWidth;
let h = window.innerHeight;
let circles = {}
let jsondict;

function setup(){
    const canvas = createCanvas(w, h);
    canvas.style('z-index', '-1');
    background(53);

    frameRate(5);

    fetch("/newWebsite/assets/experiences.json")
    .then(response => {
        return response.json();
    }).then(output =>{
        jsondict = output;
    });
}

function draw(){
    background(53);
    w = window.innerWidth;
    h = window.innerHeight;
    spacing = (w-200)/5;
    const L1 = 100;
    const L2 = spacing * 1;
    const L3 = spacing * 2;
    const L4 = spacing * 3;
    const L5 = spacing * 4;
    const L6 = spacing * 5;


    fill(53);
    stroke('#8D918D');
    strokeWeight(1);
    drawLines(5, 1, L2, L1);
    drawLines(4, 5, L3, L2);
    drawLines(4, 4, L4, L3);
    drawLines(5, 4, L5, L4);
    drawLines(3, 5, L6, L5);

    strokeWeight(3);
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    stroke('#89CFF0');
    createLayer(1, L1, 'About');
    
    stroke('#FFD700');
    createLayer(5,L2, "Education");
    createLayer(4,L3, "Experiences");
    createLayer(4,L4, "Projects");
    createLayer(5,L5, "Events");
    
    stroke('#89CFF0');
    createLayer(3, L6, 'Output');
}

function drawLines(nodes, previousNodes, x, previousX){
    const LHP = h/(previousNodes+1);
    const LH = h/(nodes+1);
    for(let i=1; i<=previousNodes; i++){
        for(let j=1; j<=nodes; j++){
            line(previousX, LHP * i, x, LH * j);
        }
    }
}

function createLayer(nodes, x, layerPurpose){
    const NH = h/(nodes+1);
    let circ = {};
    for(let i=1; i<=nodes; i++){
        circle(x, NH * i, 50);
        circ[i] = {'x': x, 'y': NH*i};
    }
    circles[layerPurpose] = circ;
}

function mousePressed() {
    for (let [key, value] of Object.entries(circles)){
        for (let [key2, value2] of Object.entries(value)){
            if (dist(mouseX,mouseY,value2.x, value2.y) < 25){
                console.log(jsondict[key][key2]);
                createDiv(jsondict[key][key2].Description);
                const div = document.querySelector("div");
                div.classList.add("scaled");
            }
        }
    }
}
