// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5IKh4qTTdOswM1ya6HaKE6bI-zeLiXaY",
    authDomain: "millburn-goodsports.firebaseapp.com",
    projectId: "millburn-goodsports",
    storageBucket: "millburn-goodsports.appspot.com",
    messagingSenderId: "154898747965",
    appId: "1:154898747965:web:370e7fe3462602f132d054",
    measurementId: "G-MWZQ7V4L9L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
