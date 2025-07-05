// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-23dc1.firebaseapp.com",
  projectId: "mern-estate-23dc1",
  storageBucket: "mern-estate-23dc1.appspot.com",
  messagingSenderId: "796125066882",
  appId: "1:796125066882:web:f009a821588ebcd976a69b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);