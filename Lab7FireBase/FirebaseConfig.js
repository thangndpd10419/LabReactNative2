// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8e7ByqsUFxNr7s_0EW7Az17ftgQhE0xM",
  authDomain: "lab7-a8dd7.firebaseapp.com",
  projectId: "lab7-a8dd7",
  storageBucket: "lab7-a8dd7.firebasestorage.app",
  messagingSenderId: "416166835887",
  appId: "1:416166835887:web:d7bc3652cc03ac3050865a",
  measurementId: "G-MCB1VS4YW9",
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_auth = getAuth(Firebase_app);
