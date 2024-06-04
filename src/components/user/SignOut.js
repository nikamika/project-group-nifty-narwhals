import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { auth } from "../../firebase"

// button for sign out
const SignOut = () => {

    let navigate = useNavigate()

    return (
        <Button variant="primary" className="m-1 text-white" onClick={() => { auth.signOut(); navigate('/') }}>Sign Out</Button>
    )
}

export default SignOut