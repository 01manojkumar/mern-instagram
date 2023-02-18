import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
  authDomain: "instagram-clone-23884.firebaseapp.com",
  databaseURL: "https://instagram-clone-23884.firebaseio.com",
  projectId: "instagram-clone-23884",
  storageBucket: "instagram-clone-23884.appspot.com",
  messagingSenderId: "671034896143",
  appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
});


/* db == by this we will access database-----

auth== by this we are going to handle login , creating users etc.

storage ===   by this we can upload data and store it on database */



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
