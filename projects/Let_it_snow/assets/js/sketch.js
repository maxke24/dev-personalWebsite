let snow = [];

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(25);
    snow.push(new Particle);
}

function draw(){
    background(25);
    for(let i = snow.length - 1; i >= 0; i--){
        if(snow[i].offScreen()){
            snow.splice(i, 1);
        }
        snow[i].update();
        snow[i].show();
    }
    if(random(1) < 0.5){
        snow.push(new Particle());
    }
}
