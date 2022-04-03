//add() to generate random ids, go through collection and sort by time stamp,
//then change innerhtml if image == true or text == true
//learn to hostit and that'd be cool


// get the code and display on some elements
let rndcode;
function getrndCode() {

        rndcode = window.localStorage.getItem("code");
        console.log(rndcode);

        db.collection("meetups").doc(rndcode).set({
            code: rndcode
        });
        if (window.localStorage.getItem("code") == null) {
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
              // let me to know who is the user that logged in to get the UID
            userDoc = db.collection("users").doc(user.uid);
            addCurrentUser = db.collection("meetups").doc(rndcode).collection("users")
            .doc(user.uid)
            .set({
                user: user.displayName,
                email: user.email
           }, {merge: true});

           userDoc.get().then(a=>{
            //get the user name
            var user_Name= a.data().name;
           
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

uploadText => {
    firebase.auth().onAuthStateChanged(user => {
        let text = document.querySelector("textinput").value;
        
    
        document.querySelector("textinput").value="";
    })
}

// add image and use cloud
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(user => {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2
        userDoc = db.collection("users").doc(user.uid);
        addCurrentUser = db.collection("meetups").doc(rndcode)
        .set({
            user: user.uid
       }, {merge: true});


        // give timestamp after upload
        var meetupLocation = db.collection("meetups").doc(window.localStorage.getItem("code"));
        meetupLocation.set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
           }, {merge: true});
        
        

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image



            // MAKE A FOR LOOP THAT GOES THROUGH HOW MANY IMAGES AND ADDS IMAGE WITH 
            for (i = 1; i < 5; i++) {
                
            };
            //+ "/upload" + i
            var storageRef = storage.ref("images/" + user.uid  + ".jpg"); 

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

function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {      //get user object
        db.collection("users").doc(user.uid)                  //use user's uid
            .get()                                            //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic;           //extract pic url

            // use this line if "mypicdiv" is a "div"
            //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                
            // use this line if "mypic-goes-here" is an "img" 
            $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();

function pullImages(){
    db.collection("meetups").where("code", "==", rndcode)
    .collection("leads").where("timestamp", "<" )
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function pullText(){

}

function orderByTimestamp(){

}

function removeCodes() {
    localStorage.removeItem("code");
    localStorage.removeItem("typedcode");
}