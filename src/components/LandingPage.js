import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Button, Offcanvas, Carousel, Card } from 'react-bootstrap';
import SignIn from "./user/SignIn";
import SignOut from "./user/SignOut";
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {

    const [showSignOn, setShowSignOn] = useState(false) // off canvas component control
    const { user } = useAuth() // get user from context
    let navigate = useNavigate() // navigation for buttons

    return (
        <>
            <Navbar bg="dark" className="fixed-top">
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white">Virtual Space</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#Feature" className="text-white">Feature</Nav.Link>
                        <Nav.Link href="#About" className="text-white">About Us</Nav.Link>
                    </Nav>
                    <Row className="justify-content-end">
                        <Navbar.Text>
                            {!user ?
                                <>
                                    <Button variant="info" className="m-1 text-white" onClick={() => navigate('/app')}>Try It Out!</Button>
                                    <Button variant="primary" className="m-1" onClick={() => setShowSignOn(true)}>Sign In/Up</Button>
                                </>
                                : <>
                                    <Button variant="primary" className="m-1" onClick={() => navigate('/app')}>Welcome Back</Button>
                                    <SignOut />
                                </>
                            }
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

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/slide1.jpg"
                        alt="slide1"
                    />
                    <Carousel.Caption className="position-absolute top-50 text-end">
                        <h1>Take control of your study!</h1>
                        <Button variant="primary" className="m-1" onClick={() => navigate('/app')}>Enter Virtual Space</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/slide2.jpg"
                        alt="slide2"
                    />
                    <Carousel.Caption className="position-absolute top-50">
                        <h1>Make study remotely fun!</h1>
                        <Button variant="primary" className="m-1" onClick={() => navigate('/app')}>Enter Virtual Space</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/slide3.jpg"
                        alt="slide3"
                    />
                    <Carousel.Caption className="position-absolute top-50 text-start">
                        <h1>Concentrate like never before!</h1>
                        <Button variant="primary" className="m-1" onClick={() => navigate('/app')}>Enter Virtual Space</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container id="Feature" className="my-5">
                <Row className="my-5">
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/1025/500" />
                            <Card.Body>
                                <Card.Title>Todo List</Card.Title>
                                <Card.Text>
                                    Access todos anywhere via cloud-based todo list!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/1074/500" />
                            <Card.Body>
                                <Card.Title>Clock</Card.Title>
                                <Card.Text>
                                    Use all-in-one clock suits all your time related needs!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/169/500" />
                            <Card.Body>
                                <Card.Title>Weather</Card.Title>
                                <Card.Text>
                                    Ready for any unpredictable weather circumstances!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/433/500" />
                            <Card.Body>
                                <Card.Title>Video & Music Player</Card.Title>
                                <Card.Text>
                                    Enjoy your favorite video & music on demand!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/1003/500" />
                            <Card.Body>
                                <Card.Title>Full Screen Background</Card.Title>
                                <Card.Text>
                                    Set the perfect mood for productivity!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://picsum.photos/id/237/500" />
                            <Card.Body>
                                <Card.Title>Theme Selector</Card.Title>
                                <Card.Text>
                                    Plenty of themes to choose from!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container id="About" className="my-5">
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>About Us</Card.Title>
                        <Card.Text>
                            We are Team Nifty Narwhales! We are team of 6 developers!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}