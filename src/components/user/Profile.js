import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Container, Row, Image, Alert } from "react-bootstrap"
import Upload from "./Upload"
import Update from "./Update"

// user profile detail, account related actions
const Profile = () => {

    // get user info from auth context
    const { user, imageURL } = useAuth()
    const defaultURL = "https://dummyimage.com/200x200/888/FFF.png&text=Upload+Your+Image"

    return (
        <Container className="bg-light">
            <Row>
                {imageURL ? <Image roundedCircle thumbnail style={{ maxWidth: 200 }} className="mx-auto" src={imageURL} alt="Profile" />
                    : <Image roundedCircle thumbnail style={{ maxWidth: 200 }} src={defaultURL} className="mx-auto" alt="Default" />}
            </Row>
            <Row className="text-center">
                <Upload />
                <Alert className="mt-2">
                    <h3>Hello {user.displayName}!</h3>
                    <p>Email: {user.email}</p>
                </Alert>
            </Row>
            <Row>
                <Update />
            </Row>
        </Container>
    )
}

export default Profile