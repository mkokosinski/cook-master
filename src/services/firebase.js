// import { firebase } from '@firebase/app';
// import '@firebase/firestore';

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DATABASE_URL,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
}

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}

export const getFirestore = async () => {
  const lazyApp = await import("@firebase/app")
  const lazyFirestore = await import("@firebase/firestore")
  return getFirebase(lazyApp.firebase).firestore()
}

export const getStorage = async () => {
  const lazyApp = await import("@firebase/app")
  const lazyStorage = await import("@firebase/storage")
  return getFirebase(lazyApp.firebase).storage;
}

export const getAuth = async () => {
  const lazyApp = await import("@firebase/app")
  const lazyAuth = await import("@firebase/auth")
  return getFirebase(lazyApp.firebase).auth;
}