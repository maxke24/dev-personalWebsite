const commands = ["help", "clear", "enable dark theme", "enable light theme", "disable dark theme", "disable light theme"];

/* --Detecting keypress for opening terminal-- */
document.addEventListener("keydown", (event) => {
    const keyname = event.key;
    if (keyname === "²") {
        toggleVisibility();
    }
});

/* --Toggling the show and hide of the terminal-- */
function toggleVisibility() {
    terminal.classList.toggle("hidden");
}

/* --closing and clearing the terminal-- */
function closeTerminal() {
    clearOutput();
    toggleVisibility();
}

/* --Let user put terminal fullscreen-- */
function fullScreen() {
    terminal.style.width = "100%";
    terminal.style.height = "100%";
}

/* --Making typed input show as a stacktrace-- */
function submitCommand() {
    let command = inputBox.value;
    createTag(command);
    runCommand(command);
    inputBox.value = "";
}

function runCommand(command) {
    if(commands.includes(command)){
        switch(command){
            case "help":
                showAllCommands();
                break;
            case "clear":
                clearOutput();
                break;
            default:
                inputBox.value="command recognized";
                createTag("command recognized", true);
                break;
        }
    }else{
        createTag("Command not recognized, please type help to show available commands", true);
    }
}

function showAllCommands(){
    let list = document.createElement("ul");
    commands.forEach((command) =>{
        let li = document.createElement("li");
        let pTag = document.createElement("p");
        pTag.innerHTML = `- ${command}`;
        li.appendChild(pTag);
        list.appendChild(li);
    });
    lines.appendChild(list);
}

function clearOutput(){
    lines.innerHTML = "";
    inputBox.value = "";

}

function createTag(text, output = false){
    let ptag = document.createElement("p");
    if(output){
        ptag.innerHTML = text;
    }else{
        ptag.innerHTML = `<span class="user">root@dev.jellemax.be</span>:<span class="tilde">~</span>$ ` + text;
    }
    ptag.setAttribute("class", "terminal_type");
    lines.appendChild(ptag);
}