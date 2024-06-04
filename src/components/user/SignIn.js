import React from "react"
import firebase from "firebase/compat/app"
import { StyledFirebaseAuth } from "react-firebaseui"

// firebase ui for sign in/up
const SignIn = () => {

    // UI config for auth components
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/app', // redirect to home
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => true, // enable redirects
        },
    }

    return <StyledFirebaseAuth className="auth" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
}

export default SignIn