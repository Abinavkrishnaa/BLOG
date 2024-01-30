// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blog-7db5d.firebaseapp.com",
  projectId: "blog-7db5d",
  storageBucket: "blog-7db5d.appspot.com",
  messagingSenderId: "680278241061",
  appId: "1:680278241061:web:a60e056d6e51f3ff3f74cc"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
export const app = initializeApp(firebaseConfig);