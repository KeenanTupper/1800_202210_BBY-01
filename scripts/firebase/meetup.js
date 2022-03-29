function rndCode() {
    let rndcode = Math.floor((Math.random() * 10)) + "" + Math.floor((Math.random() * 10))
     + "" + Math.floor((Math.random() * 10)) + "" + Math.floor((Math.random() * 10));
    db.collection("meetups").doc(rndcode).set({
        code: rndcode
    })
    console.log(code);
    document.getElementById("code").innerText=code;
    document.getElementById("random-code").innerText=code;
}

rndCode();

