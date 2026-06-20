// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkLBbm6gwbRfW16vA4YucU9MWQP9rtfCg",
  authDomain: "ls-fotostory.firebaseapp.com",
  projectId: "ls-fotostory",
  storageBucket: "ls-fotostory.firebasestorage.app",
  messagingSenderId: "281416299489",
  appId: "1:281416299489:web:c0111bf6af5f463a7dd8a0",
  measurementId: "G-G66MD22MW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
