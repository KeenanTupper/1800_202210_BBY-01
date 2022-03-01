const firebaseConfig = {
  apiKey: "AIzaSyClcOiQo5vsZXmW0YBvWqZUI6TB7gox48A",
  authDomain: "bby1-agile.firebaseapp.com",
  projectId: "bby1-agile",
  storageBucket: "bby1-agile.appspot.com",
  messagingSenderId: "562116327825",
  appId: "1:562116327825:web:5f7bfd01805a3a76a3c230"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();