// lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // ✅ Add this
import { getAnalytics, isSupported } from 'firebase/analytics'; // Optional

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
const auth = getAuth(app); // ✅ Initialize and export auth

// Optional: Firebase Analytics (only if running in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { auth };
