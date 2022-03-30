
function getCodeNumber() {
    let code = document.querySelector("input").value;
    console.log(code);
    
}

let code = document.querySelector("input").value;

function moveTOGroup() {
    localStorage.setItem("typedcode", code);
    window.location.href="./meetup.html";
}