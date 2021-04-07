let text, upliftingTexts;

document.addEventListener("DOMContentLoaded", init);

function init() {
    text = true;
    upliftingTexts = false;
    let checkbox = document.querySelector("#texts");
    checkbox.checked = true;
    checkbox.addEventListener("change", toggleText);
}

function toggleText(e){
    e.preventDefault();
    text = e.target.checked;
}
