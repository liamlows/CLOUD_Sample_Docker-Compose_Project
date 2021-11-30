import React from "react"
import { SportRepository } from '../api/SportRepository';
import { Nav,Navbar,NavDropdown,Container,Dropdown,DropdownButton } from "react-bootstrap";

export class Dashboard extends React.Component {
    state = {
        league_name: "select",
        game_list: [],
        team_list: [],
        player_list: []
    }
    db = new SportRepository();

    handleSelectLeague =(e) =>{
        this.setState({league_name :e})
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
                                <NavDropdown title= {this.state.league_name} id="basic-nav-dropdown" onSelect={this.handleSelectLeague}>
                                    <NavDropdown.Item eventKey='NBA' > NBA </NavDropdown.Item>
                                    <NavDropdown.Item eventKey='MLB'> MLB </NavDropdown.Item>
                                    <NavDropdown.Item eventKey='NFL'> NFL </NavDropdown.Item>

                                </NavDropdown>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
