
// import { firebase } from '@firebase/app';
// import '@firebase/firestore';

const config = {
  apiKey:process.env.GATSBY_API_KEY,
  authDomain:process.env.GATSBY_AUTH_DOMAIN,
  databaseURL:process.env.GATSBY_DATABASE_URL,
  projectId:process.env.GATSBY_PROJECT_ID,
  storageBucket:process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId:process.env.GATSBY_MESSAGING_SENDER_ID,
  appId:process.env.GATSBY_APP_ID
};

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}

// class Firebase {
//   constructor() {
//     firebase.initializeApp(config);
//     this.store = firebase.firestore;
//     this.auth = firebase.auth;
//   }

//   getSnap = async (collectionName) =>{
//     const collect = await this.store().collection(collectionName).get();
//     return collect.docs.map(doc => doc.data());
//   }

//   tips = () => {
//     return  this.getSnap('Tips'); 
//   }
// }

// export default new Firebase();