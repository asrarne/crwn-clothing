import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  writeBatch,
  collection,
  doc,
  getFirestore,
  getDoc,
  setDoc,
} from "firebase/firestore";

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

const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);

export const db = getFirestore();



//populating data into firestore - it is one time activity
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const collectionRef = doc(collection(db, collectionKey));
    batch.set(collectionRef, obj);
  });
  return await batch.commit();
};

// Authenticate user on sigin
export const authSignInWithEmailPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// create Auth for new user
export const authSignUpWithEmailPassword = async (
  email,
  password,
  displayName
) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

//Create new user in firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  let docSnap = await getDoc(userRef);

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
