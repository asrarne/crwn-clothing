import { initializeApp } from "firebase/app";
import {
          getAuth, GoogleAuthProvider,
          signInWithPopup, createUserWithEmailAndPassword,
          signInWithEmailAndPassword
        } from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(config);
export const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });
// export const signInWithPopup = signInWithPopup();
const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);
const db = getFirestore();

export const authSignInWithEmailPassword = async (email, password) => {
  try {
        await signInWithEmailAndPassword(auth, email, password);
  }catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(` Error in user SignIn, ${errorCode}:${errorMessage}` );
  };
}

export const authSignUpWithEmailPassword = async (email, password, displayName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return createUserProfileDocument(user, {displayName})
  }catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(` Error in user SignUp, ${errorCode}:${errorMessage}` );
  };
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  console.log({...additionalData});
  // const db = getFirestore();
  const userRef = doc(db, "users", userAuth.uid);
  let docSnap = await getDoc(userRef);

  // console.log(docSnap.exists());
  // console.log(JSON.stringify(docSnap));

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      // console.log('b4',docSnap.data())
      docSnap = await getDoc(userRef);
      // console.log('after: ',docSnap.data())
    } catch (error) {
      console.log("Error creating user ", error);
    }
  }
  return docSnap;
};

export { signInWithGoogle as default };
