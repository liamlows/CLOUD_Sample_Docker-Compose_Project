import React from 'react';
import { Route, Link } from 'react-router-dom';
import { SportRepository } from '../api/SportRepository';
import { Navbar, Nav, Table, Form, Button, Container, Row, Col, Modal, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import { Player } from '../models/Player';
import './GameView.css';

export class GameView extends React.Component {
    //props = gameId
    repo = new SportRepository();
    loggedInUser = localStorage.getItem("adminLogin");

    constructor(props) {
        super(props);
        this.state = {
            gameID: this.props.match.params.gameID,
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

            mvpPlayer: new Player(),
            isMVP: false,
            votePosted: false,

            show1: false,
            show2: false,
            show3: false,
            displayInfoPlayer: ''
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount(){
      var loggedInUser = localStorage.getItem("adminLogin");
        console.log("didmount", loggedInUser);
        if (typeof loggedInUser === undefined) {
            localStorage.setItem('adminLogin', false);
            console.log("Set login to false");
            loggedInUser = false;
            this.setState({ loggedInUser: false });
        }
        else {
            this.setState({ loggedInUser: loggedInUser });
        }
      
        if(this.state.gameID){
            this.repo.getTeamName1FromGameID(this.state.gameID).then(x => 
                this.setState({ team1Name: x[0]["TeamName"]}, () => {
                    this.repo.getTeamName2FromGameID(this.state.gameID).then(x => {
                        this.setState({ team2Name: x[0]["TeamName"] }, () => {

                            this.repo.getTeamIDFromTeamName(this.state.team1Name).then(x => {
                                this.setState({ team1ID: x[0]["TeamID"] }, () => {

                                    this.repo.getTeamIDFromTeamName(this.state.team2Name).then(x => {
                                        this.setState({ team2ID: x[0]["TeamID"] }, () => {

                                            this.repo.getPlayersFromTeam(this.state.team1ID).then(x => {
                                                this.setState({ team1Players: x, searchPlayers1: x }, () => {

                                                    this.repo.getPlayersFromTeam(this.state.team2ID).then(x => {
                                                        this.setState({ team2Players: x, searchPlayers2: x }, () => {

                                                            this.repo.getWinnerFromGame(this.state.gameID).then(x => {
                                                                this.setState({ winnerID: x[0]["WinnerID"] }, () => {

                                                                    this.repo.getTeamNameFromTeamID(this.state.winnerID).then(x => {
                                                                        this.setState({ winnerName: x[0]["TeamName"] }, () => {

                                                                            this.repo.getTeamScoreFromGame(this.state.gameID, this.state.team1ID).then(x => {
                                                                                this.setState({ team1Score: x[0]["score"] }, () => {
                                                                                    this.repo.getTeamScoreFromGame(this.state.gameID, this.state.team2ID).then(x => {
                                                                                        this.setState({ team2Score: x[0]["score"] }, () => {

                                                                                            this.repo.getGameMVP(this.state.gameID).then(x => {
                                                                                                if (x.length == 1) {
                                                                                                    this.setState({ mvpPlayer: new Player(x[0]["PlayerID"], x[0]["FirstName"], x[0]["LastName"]) }, () => {
                                                                                                        this.setState({ isMVP: true });
                                                                                                    });
                                                                                                }                                                                                         
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

    mvpDisplay(){
        if(this.state.isMVP == true){
            return <h4>The game MVP was { this.state.mvpPlayer.firstName } { this.state.mvpPlayer.lastName}.</h4>
        }
        else
            return <h4>There's no MVP yet.</h4>
    }

    votePostedDisplay(){
        if(this.state.votePosted == true){
            return <h4>Vote posted!</h4>
        }
        else
            return<> </>
    }

    showPosted(){
        this.setState({votePosted: true});
    }

    showModal = (id) => {
        if(id == 1)
            this.setState({ show1: true });
        else if (id == 2)
            this.setState({ show2: true });
        else
            this.setState({ show3: true });
    };

    hideModal = (id) => {
        if(id == 1)
            this.setState({ show1: false });
        else if (id == 2)
            this.setState({ show2: false });
        else
            this.setState({ show3: false });
    };

    getDisplayInfo(firstName, lastName){
        this.repo.getPlayerStats(firstName, lastName).then(x => {
            this.setState({ displayInfoPlayer: x[0] }, () => {
            });
        });
    }

    postMVPVote(firstName, lastName){
        let id = 0;

        this.repo.getPlayer(firstName, lastName).then(x => {
            id = x[0]["PlayerID"];
            this.repo.postMVPVote(this.state.gameID, id);
        })
    }

    render() {
        if (this.state.team2Score == 0) {
            return <>
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
                            <Nav className="mr-auto">
                                {console.log("login", this.state.loggedInUser)}
                                {this.state.loggedInUser == "true"
                                    ? (
                                        <>
                                            <Nav.Link href="/logout" className="mr-auto">LogOut</Nav.Link>
                                            <Nav.Link href="/dashboard" className="mr-auto">Admin Dashboard</Nav.Link>
                                        </>
                                    )
                                    : (<Nav.Link href="/login" className="mr-auto">Login </Nav.Link>)
                                }
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <h4 className="m-3"> Data is loading... </h4>
            </>
        }

        return <>
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
                            <Nav className="mr-auto">
                                {console.log("login", this.state.loggedInUser)}
                                {this.state.loggedInUser == "true"
                                    ? (
                                        <>
                                            <Nav.Link href="/logout" className="mr-auto">LogOut</Nav.Link>
                                            <Nav.Link href="/dashboard" className="mr-auto">Admin Dashboard</Nav.Link>
                                        </>
                                    )
                                    : (<Nav.Link href="/login" className="mr-auto">Login </Nav.Link>)
                                }
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        <div className="p-5">
            <Container fluid className="pb-3">
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
                                    <th>Number</th>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.searchPlayers1.map(player =>
                                        <tr key={player.id}>
                                            <td>{player.PlayerNumber}</td>
                                            <td>{player.FirstName} {player.LastName}
                                                <Button type="button" variant="outline-info" className="ms-3" size="sm" onClick={ () => { this.showModal(1); this.searchPlayer(player.FirstName, 1); this.getDisplayInfo(player.FirstName, player.LastName); } }>
                                                    i
                                                </Button>
                                                <Modal show={ this.state.show1 } handleClose={ this.hideModal } aria-labelledby="contained-modal-title-vcenter" centered>
                                                    <Modal.Header closeButton onClick={ () => { this.hideModal(1); this.searchPlayer("", 1) } }>
                                                        <Modal.Title><h2>Player Info for { player.FirstName} { player.LastName }</h2></Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p>Average points per game: { this.state.displayInfoPlayer.PPG }</p>
                                                        <p>Time played in { this.state.team1Name } v. { this.state.team2Name }: { this.state.displayInfoPlayer.TimePlayed} </p>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button className="info" onClick={ () => { this.hideModal(1); this.searchPlayer("", 1) } }>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>                                            
                                            </td>
                                            <td>{player.Position}</td>
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
                                    <th>Number</th>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     this.state.searchPlayers2.map(player =>
                                        <tr key={player.id}>
                                            <td>{player.PlayerNumber}</td>
                                            <td>{player.FirstName} {player.LastName}
                                                <Button type="button" variant="outline-info" className="ms-3" size="sm" onClick={ () => { this.showModal(2); this.searchPlayer(player.FirstName, 2); this.getDisplayInfo(player.FirstName, player.LastName); } }>
                                                    i
                                                </Button>
                                                <Modal show={ this.state.show2 } handleClose={ this.hideModal } aria-labelledby="contained-modal-title-vcenter" centered>
                                                    <Modal.Header closeButton onClick={ () => { this.hideModal(2); this.searchPlayer("", 2) } }>
                                                        <Modal.Title><h2>Player Info for { player.FirstName} { player.LastName }</h2></Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p>Average points per game: { this.state.displayInfoPlayer.PPG }</p>
                                                        <p>Time played in { this.state.team1Name } v. { this.state.team2Name }: { this.state.displayInfoPlayer.TimePlayed} </p>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button className="info" onClick={ () => { this.hideModal(2); this.searchPlayer("", 2) } }>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>                                            
                                            </td>
                                            <td>{player.Position}</td>
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
                        { this.mvpDisplay() }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="button" variant="primary" onClick={ () => { this.showModal(3); } }>
                            Cast your MVP vote!
                        </Button>

                        <Modal show={ this.state.show3 } handleClose={ this.hideModal } aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header closeButton onClick={ () => { this.hideModal(3) ; } }>
                                <Modal.Title><h2>Place your vote for MVP in { this.state.team1Name } v. { this.state.team2Name }</h2></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <div className="m-2">
                                            { this.votePostedDisplay() }
                                        </div>
                                        <Col>
                                            <DropdownButton id="dropdown-basic-button" title="Team 1">
                                                {
                                                    this.state.searchPlayers1.map(player =>
                                                        <Dropdown.Item onClick={ () => { this.postMVPVote(player.FirstName, player.LastName); this.showPosted(); }}>{ player.FirstName } { player.LastName }</Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                        </Col>
                                        <Col>
                                        <Col>
                                            <DropdownButton id="dropdown-basic-button" title="Team 2">
                                                {
                                                    this.state.searchPlayers2.map(player =>
                                                        <Dropdown.Item onClick={ () => { this.postMVPVote(player.FirstName, player.LastName); this.showPosted(); } }>{ player.FirstName } { player.LastName }</Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                        </Col>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="secondary" onClick={ () => { this.hideModal(3); } }>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>;
    }
}