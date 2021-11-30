import React from "react"
import { SportRepository } from '../api/SportRepository';
import { Nav, Navbar, NavDropdown, Container, Dropdown, DropdownButton, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

export class Dashboard extends React.Component {
    state = {
        league_name: "select",
        game_list: [],
        team_list: [],
        player_list: [],
        TeamOrGames: "select",
        selected_teamID: -1,
        selected_player: -1,
        FirstName: "",
        LastName: "",
        player_info: undefined
    }
    db = new SportRepository();

    handleSelectLeague = (e) => {
        this.setState({ league_name: e }, () => {
            this.db.getRanking(this.state.league_name).then(x => {
                console.log("teamlist", x);
                this.setState({ team_list: x });
            }
            )
        })
    }

    handleSelectTeam = (e) => {
        this.setState({ selected_teamID: e }, () => {
            this.db.getPlayersFromTeam(this.state.selected_teamID).then(x => {
                this.setState({ player_list: x });
            }
            )
        })
    }

    handleSelectPlayer = (e) => {
        this.setState({ selected_player: e },() => {
            this.db.getPlayersFromPlayerID(this.state.selected_player)
            .then(x=>{
                this.setState({player_info:x})
            })
            
        })
    }

    updatePlayerName = () => {
        debugger;
        this.db.putPlayerName(this.state.PlayerID, this.state.FirstName, this.state.LastName);
    }



    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand>Choose a league to edit </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title={this.state.league_name} id="league_name-nav-dropdown" onSelect={this.handleSelectLeague}>
                                    <NavDropdown.Item eventKey='NBA' > NBA </NavDropdown.Item>
                                    <NavDropdown.Item eventKey='MLB'> MLB </NavDropdown.Item>
                                    <NavDropdown.Item eventKey='NFL'> NFL </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                {
                    this.state.league_name != "select" &&
                    <>
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand>Choose a Team to edit </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <NavDropdown title={this.state.selected_teamID} id="selected_game-nav-dropdown" onSelect={this.handleSelectTeam}>
                                            {this.state.team_list.map((r, idx) => (
                                                <NavDropdown.Item eventKey={r.TeamID} > {r.TeamID} : {r.TeamName} </NavDropdown.Item>
                                            )
                                            )}
                                        </NavDropdown>
                                    </Nav>

                                </Navbar.Collapse>
                            </Container>
                        </Navbar>

                        {this.state.selected_teamID != -1 &&
                            <>
                                <Navbar bg="light" expand="lg">
                                    <Container>
                                        <Navbar.Brand>Choose a Player to edit </Navbar.Brand>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                            <Nav className="me-auto">
                                                <NavDropdown title={this.state.selected_player} id="selected_player-nav-dropdown" onSelect={this.handleSelectPlayer}>
                                                    {this.state.player_list.map((r, idx) => (
                                                        <NavDropdown.Item eventKey={r.PlayerID} > {r.PlayerID} : {r.FirstName} {r.LastName} </NavDropdown.Item>
                                                    )
                                                    )}
                                                </NavDropdown>
                                            </Nav>

                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>


                                {
                                    this.state.selected_player != -1 && this.state.player_info != undefined &&
                                    <>
                                        <Container>
                                            <Form>
                                                <Form.Group as={Row}>
                                                    <Col xs="auto">
                                                        <Form.Label>
                                                            Player FirstName:
                                                        </Form.Label>
                                                        <Form.Control size="sm" type="text" defaultValue={this.state.player_info.FirstName} onChange={e => this.setState({ FirstName: e.target.value })} />

                                                    </Col>
                                                    <Col xs="auto">
                                                        <Form.Label>
                                                            Player LastName:
                                                        </Form.Label>
                                                        <Form.Control size="sm" type="text" defaultValue={this.state.player_info.LastName} onChange={e => this.setState({ LastName: e.target.value })} />
                                                    </Col>
                                                    <Col>
                                                        <Button type="submit" onClick={() => { this.setState({ PlayerID: this.state.player_info.PlayerID }, () => { this.updatePlayerName() }) }}>
                                                            Update Name
                                                        </Button>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Form.Label>
                                                            Player Picture Url:
                                                        </Form.Label>
                                                        <Form.Control size="sm" type="text" defaultValue={this.state.player_info.Picture} />
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Form.Label>
                                                            Player Position:
                                                        </Form.Label>
                                                        <Form.Control size="sm" type="text" defaultValue={this.state.player_info.Position} />
                                                    </Col>
                                                    {/* <Col>
                                                    <Button type="submit" >
                                                        Submit
                                                    </Button>
                                                </Col> */}
                                                </Form.Group>
                                            </Form>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <hr />
                                            <br />
                                            <br />
                                            <br />
                                        </Container>
                                    </>

                                }
                            </>

                        }




                    </>
                }

            </>
        )
    }
}
