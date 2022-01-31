import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const config = {
    apiKey: "AIzaSyCWnXtKOiCA28A_3Hi0eA8POQOcOH0GvWM",
    authDomain: "crwn-db-e218f.firebaseapp.com",
    projectId: "crwn-db-e218f",
    storageBucket: "crwn-db-e218f.appspot.com",
    messagingSenderId: "987479167532",
    appId: "1:987479167532:web:2ce90a81f104e1d05eb789",
    measurementId: "G-2W2XGRP1LW"
  };

export const app = initializeApp(config);
export const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' });
// export const signInWithPopup = signInWithPopup();
const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);

export  { signInWithGoogle as default };

