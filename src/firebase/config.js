// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1UlO0iDv5Ezqq_uBtA_zwMHyk1aU1oZk",
  authDomain: "the-dojo-ace70.firebaseapp.com",
  projectId: "the-dojo-ace70",
  storageBucket: "the-dojo-ace70.appspot.com",
  messagingSenderId: "343000509622",
  appId: "1:343000509622:web:02088f4225579b1b658a17"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp
export {projectFirestore,projectAuth,timestamp,projectStorage}