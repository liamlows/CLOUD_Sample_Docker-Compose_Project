import React from 'react';
import { Route, Link } from 'react-router-dom';
import { SportRepository } from '../api/SportRepository';
import { Navbar, Nav, Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Player } from '../models/Player';

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
        team2Players: [],
        team1Score: 0,
        team2Score: 0,

        winnerID: '',
        winnerName: '',

        searchPlayers1: [],
        searchPlayers2: [],
        nameSearch: '',

        mvpPlayer: new Player()
    }

    repo = new SportRepository();
    gameID = this.props.match.params.gameID;

    //TODO: add points player has scored
    //TODO: add links to player pages
    //TODO: add mvp functionality

    componentDidMount(){
        console.log("componentDidMount method");
        console.log("gameID: ", this.gameID);

        if(this.gameID){
            this.repo.getTeamName1FromGameID(this.gameID).then(x => 
                this.setState({ team1Name: x[0]["TeamName"]}, () => {
                    console.log("team1Name: ", this.state.team1Name);

                    this.repo.getTeamName2FromGameID(this.gameID).then(x => {
                        this.setState({ team2Name: x[0]["TeamName"] }, () => {
                            console.log("team2Name: ", this.state.team2Name);

                            this.repo.getTeamIDFromTeamName(this.state.team1Name).then(x => {
                                this.setState({ team1ID: x[0]["TeamID"] }, () => {
                                    console.log("team1ID: ", this.state.team1ID);

                                    this.repo.getTeamIDFromTeamName(this.state.team2Name).then(x => {
                                        this.setState({ team2ID: x[0]["TeamID"] }, () => {
                                            console.log("team2ID: ", this.state.team2ID);

                                            this.repo.getPlayersFromTeam(this.state.team1ID).then(x => {
                                                this.setState({ team1Players: x, searchPlayers1: x }, () => {
                                                    console.log("team1Players: ", this.state.team1Players);

                                                    this.repo.getPlayersFromTeam(this.state.team2ID).then(x => {
                                                        this.setState({ team2Players: x, searchPlayers2: x }, () => {
                                                            console.log("team2Players: ", this.state.team2Players);

                                                            this.repo.getWinnerFromGame(this.gameID).then(x => {
                                                                this.setState({ winnerID: x[0]["WinnerID"] }, () => {
                                                                    console.log("winnerID: ", this.state.winnerID);

                                                                    this.repo.getTeamNameFromTeamID(this.state.winnerID).then(x => {
                                                                        this.setState({ winnerName: x[0]["TeamName"] }, () => {
                                                                            console.log("winnerName: ", this.state.winnerName);

                                                                            this.repo.getTeamScoreFromGame(this.gameID, this.state.team1ID).then(x => {
                                                                                this.setState({ team1Score: x[0]["score"] }, () => {
                                                                                    console.log("team1Score: ", this.state.team1Score);
                                                                                
                                                                                    this.repo.getTeamScoreFromGame(this.gameID, this.state.team2ID).then(x => {
                                                                                        this.setState({ team2Score: x[0]["score"] }, () => {
                                                                                            console.log("team2Score: ", this.state.team2Score);

                                                                                            this.repo.getGameMVP(this.gameID).then(x => {
                                                                                                this.setState({ mvpPlayer: new Player(x[0]["PlayerID"], x[0]["FirstName"], x[0]["LastName"]) }, () => {
                                                                                                    console.log("mvpPlayer: ", this.state.mvpPlayer);
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

    async searchPlayer(name, teamNum) {
        console.log("Searching for: ", name, " from team ", teamNum);
        if (teamNum == 1) {
            await this.setState({ searchPlayers1: this.state.team1Players })
            var players = await this.state.searchPlayers1.filter(player => player.FirstName.includes(name));
            this.setState({ searchPlayers1: players });
        }
        else if (teamNum == 2) {
            await this.setState({ searchPlayers2: this.state.team2Players })
            var players = await this.state.searchPlayers2.filter(player => player.FirstName.includes(name));
            this.setState({ searchPlayers2: players });
        }
    }

    mvpVoting() {
        console.log("in mvp voting method");
    }

    render() {
        if(this.state.team2Score == 0){
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

                <h4 className="m-3"> Data is loading... </h4>
            </>
        }

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



            <Container fluid className="p-3">
                <Row>
                    <Col><h1>Game Details for { this.state.team1Name } v. { this.state.team2Name }</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <h3>The { this.state.winnerName } won the game.</h3>
                        <h4>The score was { this.state.team1Score }-{ this.state.team2Score}.</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" onChange={x => this.setState({ nameSearch: x.target.value })} placeholder="Search For Team 1 Player" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Button variant="primary" onClick={() => { this.searchPlayer(this.state.nameSearch, 1) }}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" onChange={x => this.setState({ nameSearch: x.target.value })} placeholder="Search For Team 2 Player" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Button variant="primary" onClick={() => { this.searchPlayer(this.state.nameSearch, 2) }}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>


            <Container fluid>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th colSpan="4">{this.state.team1Name}</th>
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
                                    this.state.searchPlayers1.map(player =>
                                        <tr key={player.id}>
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
                                    <th colSpan="4">{this.state.team2Name}</th>
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
                                    this.state.searchPlayers2.map(player =>
                                        <tr key={player.id}>
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

            <Container>
                <Row>
                    <Col>
                        <h4>The game MVP was { this.state.mvpPlayer.firstName } { this.state.mvpPlayer.lastName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="button" onClick={() => { this.mvpVoting(); }}>
                            Vote for game MVP
                        </button>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}