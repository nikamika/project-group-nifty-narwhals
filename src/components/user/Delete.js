import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { db, storage } from "../../firebase"
import Button from "react-bootstrap/Button"

const Delete = () => {

    const { user, imageURL } = useAuth() // get user from context
    let navigate = useNavigate()

    // delete account
    const handleDelete = () => {

        // delete user entry in the db
        db.collection("users").doc(user.uid).delete().catch((error) => {
            console.error("Error removing user entry: ", error);
        });

        // delete user uploaded image if any
        if (imageURL) {
            const imageRef = storage.refFromURL(imageURL)
            imageRef.delete().catch((error) => {
                console.error("Error removing image: ", error)
            })
        }

        // delete user account
        user.delete()
        alert("Account deleted!")
        navigate('/')
    }

    return <Button variant="danger" className="m-1" onClick={handleDelete}>Delete Account</Button>
}

export default Delete