import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios"
import { url } from '../utils/url';
import Container from "react-bootstrap/Container"
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card, CardGroup, NavDropdown } from 'react-bootstrap'
import { SportRepository } from '../api/SportRepository';
import { Form,Button } from 'react-bootstrap';

export class LeaguePage extends React.Component {
    state = {
        recent_games: [],
        ranking: [],
        search_games: [],
        name_search: ""
    }

    db = new SportRepository();

    // async getTeamName2FromGameID(GameID) {
    //     var team_name;
    //     await this.db.getTeamName2FromGameID(GameID).then(
    //         team2 => {
    //             console.log("what is team2",team2);
    //             team_name = team2[0].TeamName;

    //             console.log("what is team_name",team_name);

    //             return team_name;
    //         }
    //     );
    // }


    async searchTeams(name) {
        await this.setState({ search_games: this.state.recent_games })
        var games = await this.state.search_games.filter(game => game.Team1Name.includes(name)||game.OpponentName.includes(name) );
        this.setState({ search_games: games });
    }

    componentDidMount() {
        console.log("didmount");
        let league = this.props.league;
        console.log("league : ", league);
        if (league) {
            this.db.getAllGames(league).then(games => {
                var itemsProcessed = 0;
                games.forEach((g, index, array) => {
                    this.db.getTeamName2FromGameID(g.GameID).then(x => {
                        g["OpponentName"] = x[0].TeamName;
                        g["OpponentWins"] = x[0].Wins;
                        g["OpponentLosses"] = x[0].Losses;
                    }).then(this.db.getTeamName1FromGameID(g.GameID).then(w => {
                        console.log("w", w);
                        g["Team1Name"] = w[0].TeamName;
                        g["Team1Wins"] = w[0].Wins;
                        g["Team1Losses"] = w[0].Losses;
                        //some tricks to get a callback function from forEach
                        itemsProcessed++;
                        if (itemsProcessed === array.length) {
                            this.setState({ recent_games: games });
                            this.setState({search_games: games});
                        }
                    }
                    )
                    )
                }
                )
            });

        };

        this.db.getRanking(league).then(x => {
            this.setState({ ranking: x });
            console.log(this.state.ranking);
        }

        )
    }


    sortGamesbyDateASEC() {
        this.setState(this.state.search_games.sort((a, b) => a.Date > b.Date ? 1 : -1))
    }
    sortGamesbyDateDESC() {
        this.setState(this.state.search_games.sort((a, b) => a.Date < b.Date ? 1 : -1))
    }

    render() {
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
                </Container>
            </Navbar>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Recent Games</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <NavDropdown title="Sort by Score" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => this.sortGamesbyDateASEC()}> Sort Oldest to Newest </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.sortGamesbyDateDESC()}> Sort Newest to Oldest </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown> */}
                            <NavDropdown title="Sort by Date" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => this.sortGamesbyDateASEC()}> Sort Oldest to Newest </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.sortGamesbyDateDESC()}> Sort Newest to Oldest </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" onChange={e => this.setState({ name_search: e.target.value })} placeholder="Search For Games" />
                        </Form.Group>
                        <Button variant="primary" onClick={() => { this.searchTeams(this.state.name_search) }}>
                            Search
                        </Button>
                    </Form>
                </Container>
            </Navbar>

            <Container>

                <Row>

                    {console.log(this.state.search_games)}
                    <CardGroup>
                        {this.state.search_games.map((g) => (
                            <Col md={12} lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {console.log("HAHA", g, g.TeamName, g.OpponentName, g.GameID)}
                                            <Link to={`GameView/${g.GameID}`}>
                                                <p>Click to view game</p>
                                            </Link>
                                            {g.Team1Name}({g.Team1Wins} - {g.Team1Losses}) vs {g.OpponentName}({g.OpponentWins} - {g.OpponentLosses})
                                        </Card.Title>
                                        <Card.Text >
                                            {g.Team1Score} - {g.Team2Score}

                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted"> GameDate: {g.Date.slice(0, 10)}</Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </CardGroup>
                </Row>
            </Container>
            <br />
            <Container>
                <h3 className="text-start"> Ranking in {this.props.league} </h3>
                <Row>
                    <Col>
                        {this.state.ranking.map((r, idx) => (

                            <Card bg="secondary" key={idx} text="white">
                                <Card.Body>
                                    <Link to={`TeamView/${r.TeamID}`}>
                                        <p>Click to view team</p>
                                    </Link>
                                    <Card.Title > #{idx + 1} : {r.TeamName} </Card.Title>
                                    <Card.Text> Record : {r.Wins} - {r.Losses} </Card.Text>
                                </Card.Body>
                            </Card>

                        ))}
                    </Col>
                </Row>
            </Container>
        </>;
    }

}

export default LeaguePage;