import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2kdn0m51kELxVpL43engulG7YvT6SUXY",
  authDomain: "golden-movies-69f55.firebaseapp.com",
  projectId: "golden-movies-69f55",
  storageBucket: "golden-movies-69f55.appspot.com",
  messagingSenderId: "759492642530",
  appId: "1:759492642530:web:326aa11bda842bea2780bb",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider

const profileCollection = db.collection("profile");
const watchlistCollection = db.collection("filmes");

export { db, auth, profileCollection, watchlistCollection, googleProvider };
