const firebaseConfig = {
  apiKey: "AIzaSyClcOiQo5vsZXmW0YBvWqZUI6TB7gox48A",
  authDomain: "bby1-agile.firebaseapp.com",
  projectId: "bby1-agile",
  storageBucket: "bby1-agile.appspot.com",
  messagingSenderId: "562116327825",
  appId: "1:562116327825:web:5f7bfd01805a3a76a3c230",
  storageBucket: "gs://bby1-agile.appspot.com"
};


const app = firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
const db = firebase.firestore();

