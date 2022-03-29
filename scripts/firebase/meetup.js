let rndcode;

function getrndCode() {

    rndcode = window.localStorage.getItem("code");
    db.collection("meetups").doc(rndcode).set({
        code: rndcode
    });
    
    console.log(rndcode);
}
getrndCode();
document.getElementById("code").innerText=rndcode;
document.getElementById("random-code").innerText=rndcode;


function registerUser() {

    firebase.auth().onAuthStateChanged(user =>{
        if (user){
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            userName = db.collection("users").doc(user.uid).get();
            console.log(userName);
           addCurrentUser = db.collection("meetups").doc(rndcode).set({
                user: user.uid,
                
           }, {merge: true}); 
       }
   
    })
}
registerUser();

function registerOwner() {

}