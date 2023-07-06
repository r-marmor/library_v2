import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const app = initializeApp({
    apiKey: "AIzaSyBeK5ZeuShHZVNoawnWNxZDQ4Kpr7SWI5I",
    authDomain: "libraryv2-94e42.firebaseapp.com",
    projectId: "libraryv2-94e42",
    storageBucket: "libraryv2-94e42.appspot.com",
    messagingSenderId: "267185760685",
    appId: "1:267185760685:web:1863ac1fa004d9e9549924"
  });

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
