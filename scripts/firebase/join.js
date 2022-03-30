
function getCodeNumber() {
    let code = document.querySelector("input").value;
    console.log(code);
    window.localStorage.setItem("typedcode", "true");
    window.localStorage.setItem("code", code);
    window.location.href="./meetup.html";
}

let code = document.querySelector("input").value;
