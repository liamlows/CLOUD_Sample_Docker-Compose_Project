import React, { useState } from 'react';
import { Routes, Link } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { NavDropdown, Form, Button } from 'react-bootstrap';

import Container from "react-bootstrap/Container"

export class Teamview extends React.Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>SportsTeamWebsite</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/NBA">NBA</Nav.Link>
                            <Nav.Link href="/NFL">NFL</Nav.Link>
                            <Nav.Link href="/MLB">MLB</Nav.Link>
                        </Nav>
                        <Nav.Link href="/login" className="mr-auto">Login</Nav.Link>
                    </Container>
                </Navbar>
                <Navbar variant="white" bg="white" expand="lg">
                    <Container fluid>
                        <Navbar.Brand >Team Roster for _____</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-white-example" />
                        <Navbar.Collapse id="navbar-white-example">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-white-example"
                                    title="Sort Players By"
                                    menuVariant="white"
                                >
                                    <NavDropdown.Item href="#action/3.1">Points Scored</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Name</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Position</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="email" placeholder="Search For Player" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Container>

                </Navbar>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Position</th>
                            <th>Points Earned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>a</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>b</td>
                            <td>150</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>c</td>
                            <td>20000000000</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}