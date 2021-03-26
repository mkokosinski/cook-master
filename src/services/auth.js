import { getAuth } from "./firebase"
import React from "react"

export const singUpGoogle = async modalHandler => {
  const auth = await getAuth()
  const provider = new auth.GoogleAuthProvider()
  provider.setCustomParameters({
    display: "popup",
  })
  await signUpWithExternalProvider(provider, modalHandler)
}

export const singUpFacebook = async modalHandler => {
  const auth = await getAuth()
  const provider = new auth.FacebookAuthProvider()
  provider.setCustomParameters({
    display: "popup",
  })
  await signUpWithExternalProvider(provider, modalHandler)
}

export const signUpWithEmail = async (email, password) => {
  const auth = await getAuth()
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      return err
    })
}

export const signInWithEmail = async (email, password) => {
  const auth = await getAuth()
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error("error", err)
      throw err
    })
}

const signUpWithExternalProvider = async (provider, modalHandler) => {
  const auth = await getAuth()
  auth().useDeviceLanguage()
  return await auth()
    .signInWithPopup(provider)
    .then(res => res)
    .catch(function(error) {
      throw error
    })
}

export const AuthContext = React.createContext({ isLoggedIn: false, user: {} })

export const getCurrentUser = async () => {
  const auth = await getAuth()
  auth().onAuthStateChanged(function(user) {
    if (user) {
      return user
    } else {
      return null
    }
  })
}

export const isAuthorized = async callback => {
  const auth = await getAuth()

  await auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      const { uid, email } = firebaseUser
      localStorage.setItem("user", uid)
      callback({ isLoggedIn: true, user: { uid, email } })
    } else {
      localStorage.removeItem("user")
      callback({ isLoggedIn: false })
    }
  })
}

export const logOut = async () => {
  const auth = await getAuth()
  return await auth().signOut()
}
