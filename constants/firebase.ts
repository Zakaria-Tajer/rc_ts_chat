import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRfN_i2hjxEfRaa3HfC2QzS-vvr9iXqvM",
  authDomain: "rc-ts-59ece.firebaseapp.com",
  projectId: "rc-ts-59ece",
  storageBucket: "rc-ts-59ece.appspot.com",
  messagingSenderId: "350421851862",
  appId: "1:350421851862:web:9a6ff77426a3c960f33377",
};

// const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean } = {
//   useFetchStreams: false,
// };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
