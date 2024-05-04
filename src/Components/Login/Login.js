import React, { useContext, useState } from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router'
import {
  firebaseConfigHandle,
  HandleFacebookSignIn,
  HandleGoogleSignIn,
  HandleGoogleSignOut,
} from './LoginManager'

firebaseConfigHandle()

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: '',
  })

  const GoogleSignIn = () => {
    HandleGoogleSignIn().then((res) => {
      setUser(res)
      setLoggedInUser(res)
      history.replace(from)
    })
  }

  const FacebookSignIn = () => {
    HandleFacebookSignIn().then((res) => {
      setUser(res)
      setLoggedInUser(res)
    })
  }
  const GoogleSignOut = () => {
    HandleGoogleSignOut().then((res) => {
      setUser(res)
      setLoggedInUser(res)
    })
  }

  const handleBlur = (event) => {
    let handleState = true
    console.log(event.target.name, event.target.value)
    if (event.target.name === 'email') {
      handleState = /\S+@\S+\.\S+/.test(event.target.value)
    }
    if (event.target.name === 'password') {
      const passHandle = event.target.value.length > 6
      const passCheck = /\d/.test(event.target.value)
      handleState = passHandle && passCheck
    }
    if (handleState) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    const auth = getAuth()
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          UpdateUserName(user.name)
          setUser(newUserInfo)
        })
        .catch((error) => {
          const newError = { ...user }
          newError.success = false
          newError.error = error.message
        })
    }
    if (!newUser && user.email && user.password) {
      signOut(auth)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          history.replace(from)
        })
        .catch((error) => {
          const newError = { ...user }
          newError.success = false
          newError.error = error.message
        })
    }
    e.preventDefault()
  }

  const UpdateUserName = (name) => {
    const auth = getAuth()
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  }

  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={GoogleSignOut}>Sign Out Google</button>
      ) : (
        <button onClick={GoogleSignIn}>Sign In Google</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email is: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <br />

      <button onClick={FacebookSignIn}>Sign in with Facebook</button>
      <h1>Name is: {user.displayName}</h1>
      <img src={user.photoURL} alt="" />

      <h1>Our Authentication</h1>
      <input
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter your email"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          onBlur={handleBlur}
          name="password"
          required
        />
        <br />
        {newUser ? (
          <input type="submit" value="Sign In" />
        ) : (
          <input type="submit" value="Sign Up" />
        )}
      </form>
      {user.success ? (
        <p style={{ color: 'green', fontSize: '50px' }}>
          User Successfully Submitted
        </p>
      ) : (
        <p style={{ color: 'red', fontSize: '50px' }}>{user.error}</p>
      )}
    </div>
  )
}

export default Login
