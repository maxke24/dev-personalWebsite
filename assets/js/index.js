"use strict";


let options = [
    ["#282c34", "#282c34", "rgba(52, 73, 94, 0.4)", "rgba(0, 0, 0, 0.8)", "white", "#727575", "rgba(0, 0, 0, 0.5)"],
    /*body--------nav--------start------end--------text------subtext----border*/
    /*1*/["#fc766aff", "#ff1042", "#5b84b1ff", "#5b84b1ff", "#F6E8EA", "#F6E8EA", "#b76d68"],
    /*2*/["#0063B2FF", "#46344e", "#9CC3D5FF", "#9CC3D5FF", "#F6E8EA", "#F6E8EA", "#none"],
    /*3*/["#00539cff", "#ff1042", "#eea47fff", "#eea47fff", "#F6E8EA", "#F6E8EA", "#b76d68"],
    /*4*/["#89ABE3FF", "#FCF6F5FF", "#FCF6F5FF", "#FCF6F5FF", "#20202080", "#20202080", "#b76d68"],
    /*5*/["#195190FF", "#A2A2A1FF", "#A2A2A1FF", "#A2A2A1FF", "#20202080", "#20202080", "#none"],
    /*6*/["#283747", "#46344e", "#283747", "#283747", "#fff", "#932432", "#DE354C"],
    /*7*/["#203647", "#007CC7", "#007CC7", "#4DA8DA", "#EEFBFB", "#EEFBFB", "#12232E"],
    /*8*/["#202020", "#3F3F3F", "#202020", "#3F3F3F", "#fff", "#707070", "#FFDf6C"],
    /*9*/["#333D79FF", "#FAEBEFFF", "#FAEBEFFF", "#FAEBEFFF", "#20202080", "#20202080", "#b76d68"],
    /*10*/["#2c2b3c", "#403f4c", "#121420", "#1b2432", "#F6E8EA", "#F6E8EA", "#b76d68"]]

function openNav() {
    document.querySelector("nav").style.width = "100%";
}

function closeNav() {
    document.querySelector("nav").style.width = "0%";
}

function loadColors(){
    let colornav = document.querySelector("#colorChangeButtons");
    for(let i = 1; i < options.length; i++){
        colornav.innerHTML += `<a href="#" data-value="${i}">option ${i}</a>`;
    }
}

function setStyling(e) {
    e.preventDefault();
    const id = e.target.getAttribute("data-value");
    let colorOptions = options[id];
    document.documentElement.style.setProperty('--primary', colorOptions[0]);
    document.documentElement.style.setProperty('--nav', colorOptions[1]);
    document.documentElement.style.setProperty('--start-gradient', colorOptions[2]);
    document.documentElement.style.setProperty('--end-gradient', colorOptions[3]);
    document.documentElement.style.setProperty('--headers', colorOptions[4]);
    document.documentElement.style.setProperty('--subText', colorOptions[5]);
    document.documentElement.style.setProperty('--border-color', colorOptions[6]);
    if(window.innerWidth<1050){
        closeNav();

    }
}


$(document).ready(function(){
    $("nav").load("nav.html", ()=>{
        let pageTag = document.querySelector("body").getAttribute("data-page");
        loadColors();
        document.querySelectorAll("#colorChangeButtons a").forEach(selected => selected.addEventListener("click", setStyling))
        let navEl = document.querySelector(".animation");
        navEl.classList.add(`start-${pageTag}`);
        document.querySelector("#openMenu").addEventListener("click", openNav);
        document.querySelector(".closebtn").addEventListener("click", closeNav);
    });
});
