import React, { useState, useEffect, useContext } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imageURL, setImageURL] = useState('')

    // set up user and related info when an auth state changes
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)

            if (user) {
                // get a reference to the user document in the db
                const userRef = db.collection("users").doc(user.uid)

                // if the signed in user doesn't exist, which means new user
                // create a new document entry for the new user with its uid
                userRef.get().then((doc) => {
                    if (!doc.exists) {
                        db.collection("users").doc(user.uid).set({
                            uid: user.uid,
                            todos: []
                        }).catch((error) => {
                            console.error("Error adding user: ", error)
                        })
                    }
                }).catch((error) => {
                    console.log("Error getting user:", error)
                })

                // get user image URL
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        setImageURL(doc.data().imageURL)
                    }
                }).catch((error) => {
                    console.log("Error getting imageURL:", error)
                })
            }

            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, imageURL }} >
            {!loading && children}
        </AuthContext.Provider>
    )
}

export {
    useAuth,
    AuthProvider
}