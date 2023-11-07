// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn66QQopevT5A0UAhnpTS23TTm8cG58uA",
  authDomain: "clarifai-face-detection.firebaseapp.com",
  projectId: "clarifai-face-detection",
  storageBucket: "clarifai-face-detection.appspot.com",
  messagingSenderId: "1061327821831",
  appId: "1:1061327821831:web:09bf177e01bebf72049ea2",
  measurementId: "G-7XSKZKJSRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);