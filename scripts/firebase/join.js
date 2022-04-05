
function getCodeNumber() {
    let code = document.getElementById("getnum").value;
    console.log(code);
    window.localStorage.setItem("code", code);
    window.location.href="./meetup.html";
}


