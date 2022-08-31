import "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFE_irCt0jd6jh-61p-DqSjqZj5H542PM",

  authDomain: "rc-ts-chat.firebaseapp.com",

  projectId: "rc-ts-chat",

  storageBucket: "rc-ts-chat.appspot.com",

  messagingSenderId: "420697881660",

  appId: "1:420697881660:web:b774e232fffe9578c8d739",
};

// const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean } = {
//   useFetchStreams: false,
// };
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

connectFirestoreEmulator(db, "10.10.11.30", 8081);

// const app = initializeApp(firebaseConfig);
// const firestoreDB = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// } as any);
// export const dbFs = getFirestore(app);
