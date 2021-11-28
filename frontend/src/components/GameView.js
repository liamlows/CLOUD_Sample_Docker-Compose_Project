import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SportRepository } from '../api/SportRepository';
import { Navbar, Nav, Table, Form, Button, Container, Row, Col } from 'react-bootstrap';

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

export const GameView = () => {
    //params = gameId
    const repo = new SportRepository();
    const { gameId } = useParams();

    //create state elements
    const [ gameName1, setGameName1 ] = useState();
    const [ gameName2, setGameName2 ] = useState();

    //set the game info in state using gameId in url
    useEffect(() => { onSearch(); }, []);

    let onSearch = params => {
        repo.getTeamName1FromGameID(gameId).then(x => setGameName1(x[0]));
        repo.getTeamName1FromGameID(gameId).then(x => setGameName2(x[0]));
    }

    //if data is still loading, pause
    if(!gameName2){
        return <p>Data is loading...</p>;
    }

    return <>
    {console.log(gameName1, gameName2)}
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
                    <Row>
                        <Navbar.Brand >Game Details for *insert game names*</Navbar.Brand>
                        <div>
                            <p>*Insert basic game details*</p>
                        </div>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="email" placeholder="Search For Player" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                        <p>To create a search bar: https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d</p>
                    </Row>
                </Container>
            </Navbar>



            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan="4">Team ___</th>
                        <th colSpan="4">Team ___</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Position</th>
                        <th>Points Earned</th>

                        <th>#</th>
                        <th>Player Name</th>
                        <th>Position</th>
                        <th>Points Earned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><Link to="/">Mark</Link></td> 
                        <td>a</td>
                        <td>10</td>

                        <td>1</td>
                        <td><Link to="/">Mark</Link></td>                             
                        <td>a</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><Link to="/">Mark</Link></td> 
                        <td>b</td>
                        <td>150</td>

                        <td>2</td>
                        <td><Link to="/">Mark</Link></td> 
                        <td>b</td>
                        <td>150</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><Link to="/">Mark</Link></td> 
                        <td>c</td>
                        <td>20000000000</td>

                        <td>3</td>
                        <td><Link to="/">Mark</Link></td> 
                        <td>c</td>
                        <td>20000000000</td>
                    </tr>
                </tbody>
            </Table>
            <p>Game MPV: *Insert game mvp*</p>
            <p>If it's the most recent game, *insert mvp voting button (which opens a popup window for voting*</p>
            <p>*Insert a search bar to find a specific player*</p>
        </>;
}

/*
Get the name of the teams from a specific game (Had to be 2 separate routes)
‘/games/team1’
‘/games/team2’
GET
Body Params: GameID
*/