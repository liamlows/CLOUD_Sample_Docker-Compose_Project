import React, { useState } from 'react';
import {Routes, Link} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export class Homepage extends React.Component {
    render() {
        return (
            <>
                <div className="App container py-3">
                    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Link to="/login">Login</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Routes />
                </div>

                <h1>Sports League</h1>
                <h2>What league do you want to explore?</h2>

                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg"></img>
                </div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg"></img>
                </div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/a/a6/Major_League_Baseball_logo.svg"></img>
                </div>
            </>
        )
    }
}

export default Homepage;