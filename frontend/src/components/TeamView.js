import React, { useState } from 'react';
import { Routes, Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { NavDropdown, Form, Button } from 'react-bootstrap';
import { SportRepository } from '../api/SportRepository';

import Container from "react-bootstrap/Container"

export class Teamview extends React.Component {
    db = new SportRepository();
    state = {
        allplayers: []
    }

    componentDidMount() {
        let TeamID = 2;
        if (TeamID) {
            this.db.getPlayersFromTeam(TeamID).then(allplayers => this.setState({ allplayers }));
        }
    }
    sortPlayersbyPPG(players) {
        this.setState(players.sort((a, b) => a.PPG < b.PPG ? 1 : -1));
    }

    sortPlayersbyName(players) {
        this.setState(players.sort((a, b) => a.FirstName > b.FirstName ? 1 : -1));
    }

    sortPlayersbyPosition(players) {
        this.setState(players.sort((a, b) => a.Position > b.Position ? 1 : -1));
    }

    render() {
        if (!this.state.allplayers) {
            return <div>Loading...</div>
        }
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
                                    <NavDropdown.Item onClick={() => { this.sortPlayersbyName(this.state.allplayers) }}>First Name</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { this.sortPlayersbyPPG(this.state.allplayers) }}>Points Per Game</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { this.sortPlayersbyPosition(this.state.allplayers) }}>Position</NavDropdown.Item>
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
                            <th>Points Per Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allplayers.map(player =>
                                <tr>
                                    <td>{player.PlayerNumber}</td>
                                    <td>{player.FirstName} {player.LastName}</td>
                                    <td>{player.Position}</td>
                                    <td>{player.PPG}</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </>
        )
    }
}