import React, { useState } from 'react';
import { Routes, Link } from 'react-router-dom';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"

/*
Display MVP results
- If voting is ongoing, display current MVP
If it’s the most recent game, MVP voting button
- Clicking it opens a voting pop-up window
- Select one player from the list of players, save answer
Display a list of the players in the game
- Each name is a link to the individual player page
- Shows the player’s performance in the game
- Search bar/dropdown to find a specific player
Admins can edit values
Admins can hide certain games if they don’t want them displayed
*/

export class GameView extends React.Component {

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
                    </Container>
                </Navbar>

                <p>*Insert game name*</p>
                <p>*Insert basic game stats*</p>
                <p>Game MPV: *Insert game mvp*</p>
                <p>If it's the most recent game, *insert mvp voting button (which opens a popup window for voting*</p>
                <p>*Insert list of players in the game (each name is a link to their page*</p>
                <p>*Insert a search bar to find a specific player*</p>
                <p>*For each player, insert their basic performance*</p>
            </>
        )
    }
}

export default GameView;