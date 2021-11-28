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
import { Card, CardGroup } from 'react-bootstrap'
import { SportRepository } from '../api/SportRepository';



export class LeaguePage extends React.Component {
    state = {
        recent_games: [],
        ranking: []
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

    updateTeam2() {
        var games = this.state.recent_games;
        games.forEach(g => {
            this.db.getTeamName2FromGameID(g.GameID).then(x => g.OpponentName = x[0].TeamName);
        });
        this.setState({ recent_games: games });
    }

    componentDidMount() {
        console.log("didmount");
        let league = this.props.league;
        console.log("league : ", league);
        if (league) {
            this.db.getAllGames(league).then(games =>
                this.setState({ recent_games: games }, () => {
                    console.log("Imhere", this.state.recent_games);
                    // this.updateTeam2();
                    games.forEach(g => {
                        this.db.getTeamName2FromGameID(g.GameID).then(x => {
                            g["OpponentName"] = x[0].TeamName;
                            // g.OpponentName = x[0].TeamName;
                            
                        }
                            );
                    });
                    this.setState({ recent_games: games });
                })
            );

            this.db.getRanking(league).then(x => {
                this.setState({ ranking: x });
                console.log(this.state.ranking);
            }

            )
        }



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


            <Container>
                <h2> Recent Games </h2>
                <Row>

                    {console.log(this.state.recent_games)}
                    <CardGroup>
                        {this.state.recent_games.map((g) => (
                            <Col md={12} lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {console.log("WTF", g, g.TeamName, g.OpponentName)}
                                            {g.TeamName} ({g.Wins} - {g.Losses}) vs {g.OpponentName}
                                        </Card.Title>
                                        <Card.Text>
                                            {g.Team1Score} - {g.Team2Score}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </CardGroup>
                </Row>
            </Container>
            <br />
            <Container>
                <h3> Ranking in {this.props.league} </h3>
                <Row>
                    <Col>
                        {this.state.ranking.map((r, idx) => (

                            <Card bg="secondary" key={idx} text="white">
                                <Card.Body>
                                    <Card.Title > #{idx+1} : {r.TeamName} </Card.Title>
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