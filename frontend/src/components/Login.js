import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('You clicked submit.');

    // const user = { username, password };
    // // send the username and password to the server
    // const response = await axios.post(
    //   "http://blogservice.herokuapp.com/api/login",
    //   user
    // );
    // // set the state of the user
    // setUser(response.data)
    // // store the user in localStorage

    if (window.confirm('If you click "ok" you would be redirected . Cancel will load this website ')) {
      localStorage.setItem('adminLogin', true)
      window.location.href = '/';
    };
    // console.log(response.data)
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>SportsTeamWebsite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-white-example">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/NBA">NBA</Nav.Link>
              <Nav.Link href="/NFL">NFL</Nav.Link>
              <Nav.Link href="/MLB">MLB</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="Login">
        <h2>Admin Login Page </h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <br />
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <br />
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>


      </div>
    </>

  );
}