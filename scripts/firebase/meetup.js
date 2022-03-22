function rndCode() {
    let code = Math.floor((Math.random() * 10)) + "" + Math.floor((Math.random() * 10))
     + "" + Math.floor((Math.random() * 10)) + "" + Math.floor((Math.random() * 10));
    document.getElementById("code").innerHTML(code);
    console.log(code);
}
rndCode();
