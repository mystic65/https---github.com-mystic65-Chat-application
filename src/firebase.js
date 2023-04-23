import firebase from "firebase/app";
import "firebase/auth"


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDqG0eDv_e2z_AlSzxtsHPCo6nOrr--UAA",
    authDomain: "unichat-e2e18.firebaseapp.com",
    projectId: "unichat-e2e18",
    storageBucket: "unichat-e2e18.appspot.com",
    messagingSenderId: "879263728799",
    appId: "1:879263728799:web:6c4e1b0934d2b1f780ceaa"
  }).auth();
