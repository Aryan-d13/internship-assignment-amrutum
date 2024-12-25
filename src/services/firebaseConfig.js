// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdKrfQ5nZFoamXfDvAfLlHbtowgE_7xFg",
  authDomain: "amrutum-pharma-assignment.firebaseapp.com",
  projectId: "amrutum-pharma-assignment",
  storageBucket: "amrutum-pharma-assignment.firebasestorage.app",
  messagingSenderId: "369743780049",
  appId: "1:369743780049:web:e33bfc239e2bee2ebf0df0",
  measurementId: "G-M1MT33W2D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);