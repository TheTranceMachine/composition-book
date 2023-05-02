// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDR08iadMJNzFf6Shte3M8vbrjfBc_qOR4",
  authDomain: "composition-book.firebaseapp.com",
  projectId: "composition-book",
  storageBucket: "composition-book.appspot.com",
  messagingSenderId: "1008565990410",
  appId: "1:1008565990410:web:f895439e931ade2c8ddbf3",
  measurementId: "G-SJD56TVBVC"
});

// Initialize Firebase
// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, 'todos');