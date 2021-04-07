let font;
let points;
let totalTime;
let totalTimes = [];
let totalVehicles = [];
let x = window.innerWidth/2;
let y = window.innerHeight;
let size = 192;
let alignment;

function preload() {
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(25);
    textSize(size);
    textFont(font);
    fill(255);
    noStroke();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    alignment = font.textBounds(`${hour}:${minute}:${second}`, x, y);
    x = width/2 - alignment.w / 2;
    y = height/2 + alignment.h / 2;
    totalTimes = font.textToPoints(`${hour}:${minute}:${second}`, x, y);

    for(let i = 0; i < totalTimes.length; ++i){
        let textPoint = totalTimes[i];
        totalVehicles.push(new Vehicle(textPoint.x, textPoint.y));
    }
}

function draw() {
    background(51);
    textSize(size);
    calculateTime();
    for (let i = 0; i < totalVehicles.length; i++) {
        totalVehicles[i].behaviors()
        totalVehicles[i].update();
        totalVehicles[i].show();
    }
}

function calculateTime() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (second < 10) {
        second = `0${second}`;
    }
    totalTimes = font.textToPoints(`${hour}:${minute}:${second}`, x, y);

    for (let i = 0; i < totalVehicles.length; i++) {
        let diff = totalTimes.length - totalVehicles.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                let pos = createVector(totalTimes[totalTimes.length - 1].x, totalTimes[totalTimes.length - 1].y);
                totalVehicles.push(new Vehicle(pos.x, pos.y));
            }
        } else {
            diff *= -1;
            for (let i = 0; i < diff; i++) {
                totalVehicles.pop();
            }

        }
        if (i < totalTimes.length) {
            let textPoint = totalTimes[i];
            totalVehicles[i].target = createVector(textPoint.x, textPoint.y);
        }
    }
}

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Read custom slider
        if (properties.xPosition) {
            x = properties.xPosition.value;
        }
        if (properties.yPosition) {
            y = properties.yPosition.value;
        }
        if (properties.size) {
            size = properties.size.value;
        }
    }
};
