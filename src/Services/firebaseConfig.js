// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMCjxDxmOmJECNWk9BFjBaEq3eFXSJTwM",
  authDomain: "exploraa-2026.firebaseapp.com",
  projectId: "exploraa-2026",
  storageBucket: "exploraa-2026.appspot.com",
  messagingSenderId: "1033356940334",
  appId: "1:1033356940334:web:178f5ea9f29def1ee9fbbf",
  measurementId: "G-8XL2GNM6ST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
