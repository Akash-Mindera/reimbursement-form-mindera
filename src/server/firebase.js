import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/compat/database";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// akaszde97@gmail.com //
const firebaseConfig = {
  apiKey: "AIzaSyAzDbWKJtT3zN3SExv_9TuRKMNa4ou9EPI",
  authDomain: "reimbursement-portal.firebaseapp.com",
  databaseURL: "https://reimbursement-portal-default-rtdb.firebaseio.com",
  projectId: "reimbursement-portal",
  storageBucket: "reimbursement-portal.appspot.com",
  messagingSenderId: "827664897610",
  appId: "1:827664897610:web:dad5160ce3a56cff6bf8b3",
  measurementId: "G-TRNFB8ES1L",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        role: user.role,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    switch (err.code) {
      case "auth/Invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
        alert(err.message);
        break;
      case "auth/wrong-password":
        alert(err.message);
        break;
      default:
    }
  }
};
const registerWithEmailAndPassword = async (name, email, password, role) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,

      name,
      authProvider: "local",
      email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendPasswordResetEmail,
};

export default app.database().ref();
