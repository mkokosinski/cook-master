import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc3fO236pwdPE2INv1FOSeT6qdn-6EbDM",
  authDomain: "cookmaster-9494a.firebaseapp.com",
  databaseURL: "https://cookmaster-9494a.firebaseio.com",
  projectId: "cookmaster-9494a",
  storageBucket: "cookmaster-9494a.appspot.com",
  messagingSenderId: "770682404428",
  appId: "1:770682404428:web:a151f32e0b27477f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;