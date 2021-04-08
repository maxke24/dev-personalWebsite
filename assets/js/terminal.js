"use strict";
let terminalBox,
    header,
    inputBox,
    lines,
    minimize,
    close,
    fullscreen;

terminalBox = document.querySelector('#terminal');
inputBox = document.querySelector("#type_input");
lines = document.querySelector("#lines");
fullscreen = document.querySelector("#fullscreen");
minimize = document.querySelector("#minimize");
close = document.querySelector("#close");

minimize.addEventListener("click", toggleVisibility);
close.addEventListener("click", closeTerminal);
fullscreen.addEventListener("click", fullScreen);