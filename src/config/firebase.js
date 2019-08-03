import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyA-7ltw6mitxAGkGHxUGwXsOgoR4pEJR2M",
  authDomain: "cec-lyrics-generator.firebaseapp.com",
  databaseURL: "https://cec-lyrics-generator.firebaseio.com",
  projectId: "cec-lyrics-generator",
  storageBucket: "",
  messagingSenderId: "5465288862",
  appId: "1:5465288862:web:4698ba341cf47582"
};

firebase.initializeApp(config);
export const AUTH = firebase.auth();
export const DB = firebase.firestore();
DB.settings({});
export const STORAGE = firebase.storage();
export default firebase;
