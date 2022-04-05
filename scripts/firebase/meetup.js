//add() to generate random ids, go through collection and sort by time stamp,
//then change innerhtml if image == true or text == true
//learn to hostit and that'd be cool


// get the code and display on some elements
let rndcode;
let imageurl;
function getrndCode() {
        rndcode = window.localStorage.getItem("code");
        console.log(rndcode);

        db.collection("meetups").doc(rndcode).set({
            code: rndcode
        });
        if (window.localStorage.getItem("code") == null) {
            return alert("no group code")
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

function uploadText() {
    firebase.auth().onAuthStateChanged(user => {
        let textbox = document.getElementById("textinput");
        console.log(textbox.value)
        db.collection("meetups").doc(rndcode).collection("leads").add({
            user: user.uid,
            leadtext: textbox.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        })
}

// add image and use cloud
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(user => {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        // const image = document.getElementById("mypic-goes-here"); // pointer #2
    
        // give timestamp after upload
        
        

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            
            //var blob = URL.createObjectURL(file);
            //image.src = blob;            // display this image



            // MAKE A FOR LOOP THAT GOES THROUGH HOW MANY IMAGES AND ADDS IMAGE WITH 
            var rndurl = Math.floor(100000 + Math.random() * 900000);
            var reference;
            console.log(rndurl);

            //+ "/upload" + i
            
            
            firebase
            .storage()
            .ref("images/" + rndurl + ".jpg")
            .getDownloadURL();

            var storageRef = storage.ref().child("images/" + rndurl + ".jpg"); 

            storageRef.put(file) 
            .then(function(){
                console.log('Uploaded to Cloud Storage.');
                
            })


            //upload the picked file
            
            
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                                        // Save the URL into users collection
                    db.collection("meetups").doc(rndcode).collection("leads").add({
                        user: user.uid,
                        leadimg: url,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            
                    
        })
    
    })
}    

uploadUserProfilePic();



function pullData() {
    var addstuff = document.getElementById("addContent");
    db.collection("meetups").doc(rndcode).collection("leads")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebase.auth().onAuthStateChanged(user => {
            if(doc.data().leadtext) {
                if(doc.data().user == user.uid) {
                    addstuff.innerHTML+="<div><p id=\"float-right\">" + doc.data().leadtext + "</p><br>"
                    + "<h6 id=\"timestampbottom\">Time: " + doc.data().timestamp.toDate()  + "</h6></div>";
                } else {
                    addstuff.innerHTML+="<div><p id=\"float-left\">" + doc.data().leadtext + "</p> <br>"
                    + "<h6 id=\"timestampbottom\">Time: " + doc.data().timestamp.toDate()  + "</h6></div>";
                }
                
            console.log(doc.data().leadtext);
            } else if(doc.data().leadimg){
                addstuff.innerHTML+="<div><img id=\"rapid\" src=\" " + doc.data().leadimg + "\">" 
            + "<h6 id=\"timestampbottom\">Time: " + doc.data().timestamp.toDate()  + "</h6></div>";
            }
            

        })
        });
    });

}

function repeater() {
    setTimeout(pullData() , 5000);
}

repeater();

function removeCodes() {
    localStorage.removeItem("code");
    localStorage.removeItem("typedcode");
}