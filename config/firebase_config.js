// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxL-XauzHq1NxFITUhpFkWJ5tXKgVCj3Q",
//   authDomain: "fir-demofw2223-9e58d.firebaseapp.com",
//   projectId: "fir-demofw2223-9e58d",
//   storageBucket: "fir-demofw2223-9e58d.appspot.com",
//   messagingSenderId: "883391599706",
//   appId: "1:883391599706:web:5a6686a2c0082fd4ce3463"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC-8DFmqXZxmqa1x04BcKETxFO5jRQZ6iQ",
  authDomain: "myproject-3f30a.firebaseapp.com",
  projectId: "myproject-3f30a",
  storageBucket: "myproject-3f30a.appspot.com",
  messagingSenderId: "369472088906",
  appId: "1:369472088906:web:48afc58c053571a9caafb3",
  measurementId: "G-8XWD3GXP9V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


