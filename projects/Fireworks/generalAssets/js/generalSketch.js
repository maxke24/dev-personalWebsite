let fireworks = [];
let gravity;
let textFireworks = [];
let font;
let amount = 0.04;
let upliftingTextList = ["I love you!", "You're the best!", "You are my sunshine!"];
let textList = ["Programming", "Javascript!"];

function preload() {
    font = loadFont("../generalAssets/fonts/Poppins-Medium.ttf");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    gravity = createVector(0, height/979*0.15);
    textSize(120);
    textFont(font);
    stroke(255);
    fill(255);
    strokeWeight(8);
    if(text){
        if(upliftingTexts){
            textFireworks.push(new FireworkText("best", 2));
            textFireworks.push(new FireworkText("the", 1));
            textFireworks.push(new FireworkText("You're", 0));

        }else{
            textFireworks.push(new FireworkText("Programming", 0));
        }

    }

}

function draw() {
    background(0, 97);
    if(fireworks.length < 50){
    if(random() < amount){
        fireworks.push(new Firework());
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks .splice(i, 1);
        }
    }

    }

    if(text){
        if (textFireworks.length <= 0) {
            if(random() < 0.01){
                let list = upliftingTextList;
                if(!upliftingTexts){
                    list = textList;
                }
                let index = Math.floor(Math.random() * list.length);
                let text = list[index];
                textFireworks.push(new FireworkText(text));
            }
        }else{
            for (let i = textFireworks.length - 1; i >= 0; i--) {
                textFireworks[i].update();
                textFireworks[i].show();
                if (textFireworks[i].done()) {
                    textFireworks.splice(i, 1);
                }
            }
        }
    }
}
