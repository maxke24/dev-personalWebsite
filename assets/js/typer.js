"use strict";

document.addEventListener("DOMContentLoaded", initialize);

let start = 0;
let startTime;
let elapsed;
let time;
let wpm;
const characters = [];
const wrongCharacters = [];
let textContainer, typedCorrectText, typedWrongText;

function initialize() {
    textContainer = document.querySelector(".to_type");
    typedCorrectText = document.querySelector(".typed_correct");
    typedWrongText = document.querySelector(".typed_wrong");
    time = document.querySelector(".time");
    wpm = document.querySelector(".wpm");

    textContainer.innerHTML = text;

    document.addEventListener('keypress', keyPressed);
    document.addEventListener('keydown', checkBackspacePressed);
    setInterval(keepTimeAndCalculateWPM, 100)
}

function convert(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds == 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

function checkIfCorrectKeyIsPressed(pressedKey, toPressKey) {
    if (toPressKey === pressedKey) {
        typedCorrectText.innerHTML += pressedKey;
        characters.push(pressedKey);
        typedWrongText.innerHTML = "";
        (toPressKey !== " ") ? textContainer.innerText = textContainer.innerText.substring(1) : textContainer.innerText = textContainer.innerText.substring(0);
        start += 1;
    } else {
        typedWrongText.innerHTML = pressedKey;
        wrongCharacters.push(pressedKey);
    }
}

function keyPressed(e) {
    if (startTime === undefined) { startTime = new Date() }
    checkIfCorrectKeyIsPressed(e.key, text[start]);
}

function checkBackspacePressed(e) {
    if (e.code === "Backspace") {
        typedWrongText.innerText = typedWrongText.innerText.slice(0, -1);
    }
}

function keepTimeAndCalculateWPM() {
    if (startTime) {
        elapsed = new Date() - startTime;
        time.innerHTML = convert(elapsed);
        let cpm = Math.floor((characters.length / elapsed * 6000 * 10) / 4.7);
        let accuracy = Math.floor(100 - wrongCharacters.length / characters.length * 100, 2);
        wpm.innerText = `wpm: ${cpm} \t accuracy: ${accuracy}% \t wc: ${typedCorrectText.innerText.split(" ").length}/ ${text.length}`;
        document.querySelector("article").scrollTop = typedWrongText.offsetTop - 500;
    }
}