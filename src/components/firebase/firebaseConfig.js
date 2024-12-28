// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcGm1fSlDzddfM-If_4u5mzesnKnw4nu4",
  authDomain: "modern-hotel-3e21d.firebaseapp.com",
  projectId: "modern-hotel-3e21d",
  storageBucket: "modern-hotel-3e21d.firebasestorage.app",
  messagingSenderId: "108398299987",
  appId: "1:108398299987:web:eadc0eff8577f1633defa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;