// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArv4LEqfj5Fpw_TMJdM4uWlxdKS-FdCm8",
  authDomain: "run-pokemon-web.firebaseapp.com",
  databaseURL: "https://run-pokemon-web.firebaseio.com",
  projectId: "run-pokemon-web",
  storageBucket: "run-pokemon-web.appspot.com",
  messagingSenderId: "632254172553",
  appId: "1:632254172553:web:4e9b087a41d0c9d6682558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}