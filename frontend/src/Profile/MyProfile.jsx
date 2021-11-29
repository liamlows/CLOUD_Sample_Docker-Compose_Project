import React from 'react';
import { ProfileTable } from './ProfileTable';
import { BsXLg, BsCheckLg } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';
import { NavigationBar } from '../Navigation/NavigationBar';
import './Profile.css';

export class MyProfile extends React.Component {

    accountsRepository = new AccountsRepository();

    // 0, 1, 2, 3, 4
    userTypes = [
        "General User", 
        "Driver",
        "Soup Kitchen Owner",
        "RDH Owner",
        "Admin"
    ];


    state = {
        userID: 0,
        username: "",
        userType: 0,
        phoneNumber: "",
        email: "",
        imgURL: "",
        // RDHName: "",
        // soupKitchenName: "",
        // address: "",
        validated: 0
    }

    render () {
        return (
            <>
            <NavigationBar></NavigationBar>
                <div className="container w-50 my-2">
                    <h2>My Profile</h2> 
                    <div className="container w-50 my-3">
                        <div className="row">


                            {this.state.imgURL && 
                                <div className="col">
                                    <img className="border border-dark profilephoto" src={this.state.imgURL} alt="User profile pic"/>
                                </div>
                            }
                            {(this.state.imgURL === "" || this.state.imgURL.length === 0) && 
                                <div className="col">
                                    <img className="border border-dark profilephoto" src="https://place-hold.it/200" alt="User profile pic"/>
                                </div>
                            }
                            <div className="col mt-4">
                                {/* {(this.state.userType === 0 || this.state.userType === 1 || this.state.userType === 4) &&  */}
                                    <p className="d-inline-flex">
                                        <b>{this.state.username}</b>
                                    </p>    
                                {/* } */}
                                {/* {this.state.userType === 2 && 
                                    <p className="d-inline-flex">
                                        <b>{this.state.soupKitchenName}</b>
                                    </p>    
                                }
                                {this.state.userType === 3 && 
                                    <p className="d-inline-flex">
                                        <b>{this.state.RDHName}</b>
                                    </p>    
                                } */}
                                <p>{this.userTypes[this.state.userType]}</p>
                                {this.state.validated === 0 &&
                                    <p><BsXLg className="mx-1"/> Not Verified</p>
                                }
                                {this.state.validated === 1 &&
                                    <p><BsCheckLg className="mx-1"/> Verified</p>
                                }
                            </div>
                        </div>

                        {/* Do we need to keep track of a separate userType? For when an admin is looking at a different page?
                            so that they can change a user's verification status?
                            Would that be stored in sessionstorage.userID?
                            So anywhere we check for an admin only component, we check sessionstorage rather than the userType of state?
                            I think that's how that will work.
                        */}
                        {this.state.userType === 4 &&
                        // Add userType to sessionstorage and replace this check with sessionstorage.userType === 4.
                        // Do this once navving to other's profiles has been implemented.
                            <div className="container my-3">
                                <p>(Admin Only) Change user verification:</p>
                                <form>
                                    <label className="" htmlFor="verified">Verified</label>
                                    <input type="radio" className="mx-2" id="verified" name="verification" checked={this.state.verified === 1}/>
                                    <label className="form-label" htmlFor="not_verified">Not Verified</label>
                                    <input type="radio" className="mx-2"id="not_verified" name="verification" checked={this.state.verified === 0}/>
                                </form>
                            </div>
                        }

                    </div>
                    
                    <div className="container my-4">
                        <h5><u>Contact Information</u></h5>
                        <span className="mx-2">{this.state.phoneNumber}</span> {/* https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/41318684 */}
                        <span className="mx-2">{this.state.email}</span>
                        {/* {this.state.userType === 2 && 
                            <span className="mx-2">
                                {this.state.address}
                            </span>
                        }
                        {this.state.userType === 3 && 
                            <span className="mx-2">
                                {this.state.address}
                            </span>
                        } */}
                    </div>

                    <Link className="btn btn-primary w-10 mb-4" to={`/profile/edit`}>Edit Profile</Link>

                    {/* Table of each donations where this user is involved */}
                    <ProfileTable></ProfileTable>

                </div>
            </>
        )

    }

    componentDidMount() { 
        let userID = sessionStorage.userID;
        if (userID) {
            this.accountsRepository.getUser(userID)
            .then(account => this.setState(account[0]));
        }
    }

}

export default MyProfile;