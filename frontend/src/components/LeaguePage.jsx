import React, { useEffect, useState } from 'react';
import { Routes, Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios"
import { url } from '../utils/url';
import Container from "react-bootstrap/Container"
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const LeaguePage = (props) => {

    const [games, setGames] = useState([]);
    let league_name = props.league
    const getAllGames = () => {
        console.log("here");
        console.log(props.league);
        const leageu_name = 
        axios.get(`http://${url}:8000/games/league`,{
            params: {
              league: league_name
            }
          })
            .then((response) => {
                console.log(response);
                const allGames = response.data;
                setGames(allGames);
            })
            .catch(err => {
                console.log(err)
            });

            ;
    }

    useEffect(() => getAllGames(), []);

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


            <Container>
                <Row>
                    <Col>
                        <p> test </p>
                        {games.map((games) => (
                            <Stack direction="horizontal" gap={3}>
                                <p>
                                    {games.Team1ID} vs {games.Team2ID}
                                </p>
                            </Stack>
                        ))}
                    </Col>
                    <Col >
                    </Col>
                </Row>
            </Container>


        </>
    )

}

export default LeaguePage;