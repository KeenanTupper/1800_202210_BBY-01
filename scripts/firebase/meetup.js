// create random code and display on page
let rndcode;

function getrndCode() {

    rndcode = window.localStorage.getItem("code");
    db.collection("meetups").doc(rndcode).set({
        code: rndcode
    });
    
    console.log(rndcode);
}
getrndCode();

document.getElementById("random-code").innerText=rndcode;
document.getElementById("random-code2").innerText=rndcode;


// add user to database
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

// give owner ability to delete images
function registerOwner() {

}




function userAddImage() {
    if (localStorage.getItem("code") == db.collection) {

    }
}

function removeCodes() {
    localStorage.removeItem("code");
    localStorage.removeItem("typedcode");
}