// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";  // ← 여기에 firestore 함수들 import 추가

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7NqUF5Jk-GyE1LGGF8nMyllb6O8np_no",
  authDomain: "test-page-f7c0f.firebaseapp.com",
  projectId: "test-page-f7c0f",
  storageBucket: "test-page-f7c0f.firebasestorage.app",
  messagingSenderId: "876294976343",
  appId: "1:876294976343:web:65bbaef75f1e8a6f2a8412",
  measurementId: "G-DE6LNXE997"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db, doc, getDoc, setDoc, updateDoc, increment };
