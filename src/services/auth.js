import { getAuth } from "./firebase"
import React from "react"

export const singUpGoogle = async modalHandler => {
  const auth = await getAuth()
  const provider = new auth.GoogleAuthProvider()
  console.log("asd", auth)
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
  console.dir(auth)
  await auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      return err
    })
}

const signUpWithExternalProvider = async (provider, modalHandler) => {
  const auth = await getAuth()
  auth().useDeviceLanguage()
  return await auth()
    .signInWithPopup(provider)
    .then(res => res)
    .catch(function(error) {
      console.log("Auth error", error);
      
      // if (error.code === "auth/account-exists-with-different-credential") {
      //   const pendingCred = error.credential
      //   const email = error.email
      //   auth()
      //     .fetchSignInMethodsForEmail(email)
      //     .then(function(methods) {
      //       if (methods[0] === "password") {
      //         const password = "test123" //promptUserForPassword() // TODO: implement promptUserForPassword.
      //         auth()
      //           .signInWithEmailAndPassword(email, password)
      //           .then(function({ user }) {
      //             // Step 4a.
      //             console.log("user", user)
      //             console.log(
      //               "user.linkWithCredential",
      //               user.linkWithCredential
      //             )

      //             return user.linkWithCredential(pendingCred)
      //           })
      //           .then(function() {
      //             // Facebook account successfully linked to the existing Firebase user.
      //           })
      //         return
      //       }
      //       // All the other cases are external providers.
      //       // Construct provider object for that provider.
      //       // TODO: implement getProviderForProviderId.
      //       const provider = auth.GoogleAuthProvider() //getProviderForProviderId(methods[0])
      //       // At this point, you should let the user know that they already has an account
      //       // but with a different provider, and let them validate the fact they want to
      //       // sign in with this provider.
      //       // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      //       // so in real scenario you should ask the user to click on a "continue" button
      //       // that will trigger the signInWithPopup.
      //       auth()
      //         .signInWithPopup(provider)
      //         .then(function(result) {
      //           // Remember that the user may have signed in with an account that has a different email
      //           // address than the first one. This can happen as Firebase doesn't control the provider's
      //           // sign in flow and the user is free to login using whichever account they own.
      //           // Step 4b.
      //           // Link to Facebook credential.
      //           // As we have access to the pending credential, we can directly call the link method.
      //           console.log("sing in", result)
      //           result.user
      //             .linkAndRetrieveDataWithCredential(pendingCred)
      //             .then(function(usercred) {
      //               // Facebook account successfully linked to the existing Firebase user.
      //               console.log("linkAndRetrieveDataWithCredential", usercred)
      //             })
      //         })
      //     })
      // }
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

  await auth().onAuthStateChanged(user => {
    console.log("auth user", user)

    if (user) {
      callback({ isLoggedIn: true, user })
    } else {
      callback({ isLoggedIn: false })
    }
  })
}

export const logOut = async () => {
  const auth = await getAuth()

  auth()
    .signOut()
    .then(res => {
      console.log("sign out", res)
    })
    .catch(error => {
      console.log("sign out error", error)
    })
}
