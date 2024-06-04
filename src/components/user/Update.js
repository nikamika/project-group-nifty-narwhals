import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { auth } from "../../firebase"
import Delete from "./Delete"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

// update user name & email
const Update = () => {

    const { user } = useAuth() // get user from context

    // states for name, email, password inputs
    const [nameInput, setName] = useState(null)
    const [emailInput, setEmail] = useState(null)
    const [passwordInput, setPassword] = useState(null)

    // check the user login method
    // third party logins are not allowed to change emails & passwords
    let provider = null
    if (user.providerData[0].providerId === "password") {
        provider = "email-password"
    } else {
        provider = "third-party"
    }

    // update name & email
    const handleUpdate = () => {
        // update user in firebase
        user.updateProfile({
            displayName: nameInput
        })
        user.updateEmail(emailInput)
        user.updatePassword(passwordInput)

        // if email or password is changed, user will be signed out automatically
        if (emailInput || passwordInput) {
            auth.signOut()
            alert("Please sign in again!")
        }

        alert("Account updated!")
        window.location.reload(true)
    }

    return (
        <Form>
            <Form.Label>Name</Form.Label>
            <Form.Control className="mb-1" type="text" size={30} placeholder={user.displayName} onChange={(e) => setName(e.target.value)} />
            {provider === "third-party" &&
                <Form.Text className="text-muted">
                    Email & password can't be modified with social login!
                </Form.Text>
            }
            {provider === "email-password" &&
                <>
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="mb-1" type="text" size={30} placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="mb-1" type="password" size={30} placeholder="type new password" onChange={(e) => setPassword(e.target.value)} />
                </>}
            <Button className="m-1" onClick={handleUpdate}>Update Account</Button>
            <Delete />
        </Form>
    )
}

export default Update