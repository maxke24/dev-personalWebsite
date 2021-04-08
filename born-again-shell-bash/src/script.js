"use strict";
let terminal, header, inputBox, lines, minimize, close, fullscreen;

document.addEventListener("DOMContentLoaded", init);

function init(){
  terminal = document.querySelector('#terminal');
  inputBox = document.querySelector("#type_input");
  lines = document.querySelector("#lines");
  fullscreen = document.querySelector("#fullscreen");
  minimize = document.querySelector("#minimize");
  close = document.querySelector("#close");

  minimize.addEventListener("click", toggleVisibility);
}

/* --Detecting keypress for opening terminal-- */
document.addEventListener("keydown", (event) => {
  const keyname = event.key;
  if(keyname === "²"){
    toggleVisibility();
  }
});


/* --Toggling the show and hide of the terminal-- */
function toggleVisibility(){
  terminal.classList.toggle("hidden");
}

/* --closing and clearing the terminal-- */
function closeTerminal(){
  lines.innerHTML = "";
  toggleVisibility();
}

/* --Making typed input show as a stacktrace-- */

function submitCommand() {
  var ptag = document.createElement("p");
  ptag.innerHTML = `<span class="user">root@dev.jellemax.be</span>:<span class="tilde">~</span>$ ` + inputBox.value;
  ptag.setAttribute("class", "terminal_type");
  inputBox.value = "";
  lines.appendChild(ptag);
}


/* --Code to make the terminal draggable (only by the bar not the box itself-- */
// Make the DIV element draggable:
dragElement(document.querySelector('#terminal'));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("terminal_bar")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("terminal_bar").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}