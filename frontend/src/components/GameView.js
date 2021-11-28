import React, { useState, useEffect } from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import { SportRepository } from '../api/SportRepository';
import { Navbar, Nav, Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
//import { AccountSearch } from './components/AccountSearch';

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
    //props = gameId
    state = {
        team1Name: '',
        team2Name: '',
        team1ID: '',
        team2ID: '',
        team1Players: [],
        team2Players: []
    }
    
    //set the game info in state using gameId in url
    componentDidMount(){
        console.log("componentDidMount method");
        let gameID = this.props.gameID;
        let repo = new SportRepository();
        console.log("gameID: ", gameID);
        //make this work for dynamically setting url game ID

        if(gameID){
            repo.getTeamName1FromGameID(gameID).then(x => 
                this.setState({ team1Name: x[0]["TeamName"]}, () => {
                    console.log("team1Name: ", this.state.team1Name);

                    repo.getTeamName2FromGameID(gameID).then(x => {
                        this.setState({ team2Name: x[0]["TeamName"]}, () => {
                            console.log("team2Name: ", this.state.team2Name);

                            repo.getTeamIDFromTeamName(this.state.team1Name).then(x => {
                                this.setState({ team1ID: x[0]["TeamID"]}, () => {
                                    console.log("team1ID: ", this.state.team1ID);

                                    repo.getTeamIDFromTeamName(this.state.team2Name).then(x => {
                                        this.setState({ team2ID: x[0]["TeamID"]}, () => {
                                            console.log("team2ID: ", this.state.team2ID);

                                            repo.getPlayersFromTeam(this.state.team1ID).then(x => {
                                                this.setState({ team1Players: x }, () => {
                                                    console.log("team1Players: ", this.state.team1Players);

                                                    repo.getPlayersFromTeam(this.state.team2ID).then(x => {
                                                        this.setState({ team2Players: x }, () => {
                                                            console.log("team2Players: ", this.state.team2Players);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
            );
        }
    }

    render(){
        return <>
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
                        <Navbar.Brand >Game Details for { this.state.team1Name } v. { this.state.team2Name } </Navbar.Brand>
                        <div>
                            <p>*Insert basic game details*</p>
                        </div>
                    </Row>
                    <Row>

                        <p>To create a search bar: https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d</p>

                    </Row>
                </Container>
            </Navbar>


            <Container fluid>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th colSpan="4">Team ___</th>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                    <th>Points Earned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.team1Players.map(player =>
                                    <tr>
                                        <td>{player.PlayerNumber}</td>
                                        <td>{player.FirstName} {player.LastName}</td>
                                        <td>{player.Position}</td>
                                        <td>{player.PPG}</td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </Col>

                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th colSpan="4">Team ___</th>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                    <th>Points Earned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.team2Players.map(player =>
                                    <tr>
                                        <td>{player.PlayerNumber}</td>
                                        <td>{player.FirstName} {player.LastName}</td>
                                        <td>{player.Position}</td>
                                        <td>{player.PPG}</td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <p>Game MPV: *Insert game mvp*</p>
            <p>If it's the most recent game, *insert mvp voting button (which opens a popup window for voting*</p>
            <p>*Insert a search bar to find a specific player*</p>
        </>;
    }
}

/*
Get the name of the teams from a specific game (Had to be 2 separate routes)
‘/games/team1’
‘/games/team2’
GET
Body Params: GameID

<Route path="/" exact render={ props => <Link className="btn btn-sm btn-info mb-4" to="/search">Search</Link> } />
                        <Route path="/search" exact render={ props => <AccountSearch onSearch={ params => onSearch(params)} /> } />
                        
*/