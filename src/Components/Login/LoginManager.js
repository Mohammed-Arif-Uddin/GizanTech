import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import firebaseConfig from './firebase.config'
import { getAuth } from 'firebase/auth'

export const firebaseConfigHandle = () => {
  firebase.initializeApp(firebaseConfig)
}

export const HandleGoogleSignIn = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(GoogleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user

      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      }
      return signedInUser
    })
    .catch((err) => {
      console.log(err)
      console.log(err.message)
    })
}

//Google signOut start HERE
export const HandleGoogleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signOutHandle = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false,
      }
      return signOutHandle
    })
    .catch((error) => {
      // An error happened.
    })
}

export const HandleFacebookSignIn = () => {
  const FacebookProvider = new firebase.auth.FacebookAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(FacebookProvider)
    .then((result) => {
      const user = result.user
      const accessToken = result.credential.accessToken
      user.success = true
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
    })
}





