// create random code and display on page
let rndcode;

function getrndCode() {

        rndcode = window.localStorage.getItem("code");
        console.log(rndcode);
        db.collection("meetups").doc(rndcode).set({
            code: rndcode
        });
        if (window.localStorage.getItem == null) {
        alert("no group code")
    }
    
}   
getrndCode();





document.getElementById("random-code").innerText=rndcode;
document.getElementById("random-code2").innerText=rndcode;


// add user to database
function registerUser() {

    firebase.auth().onAuthStateChanged(user =>{
        if (user){
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            userDoc = db.collection("users").doc(user.uid);
            addCurrentUser = db.collection("meetups").doc(rndcode)
            .set({
                user: user.uid
           }, {merge: true});

           userDoc.get().then(a=>{
            //get the user name
            var user_Name= a.data().name;
            console.log(user_Name);
            //$("#name-goes-here").text(user_Name); //jquery
            document.getElementById("user").innerText=user_Name;
        })    
       } else if (!user) {
            alert("what are you doing here?");
            window.location.href="./pre-index.html";
       }
   
    })
}
registerUser();

// give owner ability to delete images
function registerOwner() {

}


// add image and use cloud
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = storage.ref("images/" + user.uid + ".jpg"); 
            
            //upload the picked file
            storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

						//get the URL of stored file
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                    console.log(url);    // Save the URL into users collection
                    db.collection("meetups").doc(window.localStorage.getItem("code")).update({
                        "images": url
                    })
                    .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                    })
                })
        })
    })
}
uploadUserProfilePic();

function removeCodes() {
    localStorage.removeItem("code");
    localStorage.removeItem("typedcode");
}