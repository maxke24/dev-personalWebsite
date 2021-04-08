"use strict";

$(document).ready(function () {
    $("#terminal").load("terminal.html", ()=>{
        $.getScript("assets/js/navHandling.js");
        $.getScript("assets/js/terminalFunctionality.js");
        $.getScript("assets/js/terminal.js");
        $.getScript("assets/js/dragHandler.js");

    });

});
