import { firebase } from '@firebase/app';
import '@firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyDc3fO236pwdPE2INv1FOSeT6qdn-6EbDM",
    authDomain: "cookmaster-9494a.firebaseapp.com",
    projectId: "cookmaster-9494a"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;

