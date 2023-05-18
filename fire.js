// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2JuziZauRmS2s0nA9wVUeFtTDM8OeAn8",
  authDomain: "hackatonislamsalim.firebaseapp.com",
  projectId: "hackatonislamsalim",
  storageBucket: "hackatonislamsalim.appspot.com",
  messagingSenderId: "57521605062",
  appId: "1:57521605062:web:7003485889e297f7a68ac7",
  measurementId: "G-T9X96BSPX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
