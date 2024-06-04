import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const appConfig = {
    apiKey: "AIzaSyA1xcPbCkZ7lhfcZYlJ4iC9IbBvBXjvVLM",
    authDomain: "nifty-narwhales.firebaseapp.com",
    projectId: "nifty-narwhales",
    storageBucket: "nifty-narwhales.appspot.com",
    messagingSenderId: "119741111613",
    appId: "1:119741111613:web:48efae343443a92dcbf954"
}

const app = firebase.initializeApp(appConfig)
const auth = app.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {
    app,
    auth,
    db,
    storage
}