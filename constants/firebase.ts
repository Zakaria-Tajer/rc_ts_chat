// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDj0rnR8HHquXpOjgYjU84X3PDDbaXTLLg",
  authDomain: "chat-groupe-58576.firebaseapp.com",
  projectId: "chat-groupe-58576",
  storageBucket: "chat-groupe-58576.appspot.com",
  messagingSenderId: "387395013846",
  appId: "1:387395013846:web:99bebbbffa7879074e8d77",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();