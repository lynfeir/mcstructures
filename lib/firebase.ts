// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9sTqHoL-jRuIgANYEhJ0miTyM_cE6POc",
  authDomain: "mcstructurehub.firebaseapp.com",
  projectId: "mcstructurehub",
  storageBucket: "mcstructurehub.firebasestorage.app",
  messagingSenderId: "417035706930",
  appId: "1:417035706930:web:173215923a98d93a52d22b",
  measurementId: "G-24S6X8XMDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);