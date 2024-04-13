// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB5YAlsQS7txzit0DmIxxsSaaCsOw32plo",
  authDomain: "loldraft-2d030.firebaseapp.com",
  projectId: "loldraft-2d030",
  storageBucket: "loldraft-2d030.appspot.com",
  messagingSenderId: "453131550263",
  appId: "1:453131550263:web:a40ed41f9bc3cd791b49b2",
  measurementId: "G-ZT41B8MGBP"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
