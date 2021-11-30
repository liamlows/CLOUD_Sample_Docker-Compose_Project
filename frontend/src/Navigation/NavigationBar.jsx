import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class NavigationBar extends React.Component {

    state = {
        redirect: false
    }

    signout = () => {
        sessionStorage.setItem("userID", undefined);
        sessionStorage.setItem("userType", undefined);
        this.setState({redirect: true});
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={ `/` }/>
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={`/donations/`} className="nav-link">All Donations</Link>
                                </li>
                                {sessionStorage.userType === "3" &&
                                    <li className="nav-item">
                                        <Link to={`/newdonation/`} className="nav-link">New Donation</Link>
                                    </li>
                                }
                                <li className="nav-item">
                                    <Link to={`/myprofile/`} className="nav-link">My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => this.signout() }>Sign Out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        )

    }
    

}

export default NavigationBar;