import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { getStorage } from "firebase/storage";

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

// tproject740@gmail.com firebase account is being used here //
const firebaseConfig = {
  apiKey: "AIzaSyDjAWrbieMrJLlZFGoaCvvGxARcRQ_4lxg",
  authDomain: "login-reimbursement-form.firebaseapp.com",
  projectId: "login-reimbursement-form",
  storageBucket: "login-reimbursement-form.appspot.com",
  messagingSenderId: "586027704237",
  appId: "1:586027704237:web:0d360f37b6e958973f8b24",
  databaseURL: "https://login-reimbursement-form-default-rtdb.firebaseio.com",
};

// var firebaseConfiguration = {
//   apiKey: "AIzaSyAtjflgMOZOqYaomSSV7Yi0Af-5uo5dITs",
//   authDomain: "login-firebase-7ae28.firebaseapp.com",
//   projectId: "login-firebase-7ae28",
//   storageBucket: "login-firebase-7ae28.appspot.com",
//   messagingSenderId: "830264245802",
//   appId: "1:830264245802:web:9af3d31eb19700d7618d53",
//   dataBaseURL: "https://login-reimbursement-form-default-rtdb.firebaseio.com/",
// };

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

// const fireDb = firebase.initializeApp(firebaseConfiguration);
export default app.database().ref();

// const storage = getStorage(app);
// export default storage;
