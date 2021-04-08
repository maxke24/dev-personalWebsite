function submitCommand() {
  var ptag = document.createElement("p");
  ptag.textContent = document.getElementById("type-input").value;
  ptag.setAttribute("class", "terminal-type");
  document.getElementById("type-input").value = "";
  document.getElementById("lines").appendChild(ptag);
}