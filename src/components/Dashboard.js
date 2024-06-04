import React, { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Container, Row, Button, Offcanvas } from "react-bootstrap";
import SignIn from "./user/SignIn";
import SignOut from "./user/SignOut";
import Profile from "./user/Profile";
import Fullscreen from './fullscreen-mode/Fullscreen';
import ThemeSelection from "./themes/ThemeSelection";
import Toolbar from './toolbar/Toolbar';

function Dashboard() {

    // off canvas component control
    const [showSignOn, setShowSignOn] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const { user } = useAuth() // get user from context

    return (
        <>
            <Navbar bg="dark" className="fixed-top">
                <Container fluid>
                    <Navbar.Brand className="text-white" href="/">Virtual Space</Navbar.Brand>
                    <Row className="d-flex justify-content-end">
                        <Navbar.Text>
                            {!user ? <Button variant="primary" className="m-1" onClick={() => setShowSignOn(true)}>Sign In/Up</Button>
                                : <><Button variant="primary" className="m-1" onClick={() => setShowProfile(true)}>Profile</Button><SignOut /></>}
                            <Fullscreen />
                        </Navbar.Text>
                    </Row>
                </Container>
            </Navbar>

            <Offcanvas className="bg-light" placement="end" show={showSignOn} onHide={() => setShowSignOn(false)} >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <SignIn />
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas className="bg-light" placement="end" show={showProfile} onHide={() => setShowProfile(false)} >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <Profile />
                </Offcanvas.Body>
            </Offcanvas>
            <Toolbar />
            <ThemeSelection />
        </>
    )
}

export default Dashboard;
