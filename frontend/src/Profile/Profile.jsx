import React from 'react';
import { ProfileTable } from './ProfileTable';
import { ProfileEditForm } from './ProfileEditForm';
import { BsXLg, BsCheckLg } from 'react-icons/bs'

export class Profile extends React.Component {

    // 0, 1, 2, 3, 4
    userTypes = [
        "General User", 
        "Driver",
        "Soup Kitchen Owner",
        "RDH Owner",
        "Admin"
    ];

    state = {
        userName: "Landon Wood",
        userType: 4,
        phoneNumber: "2146016524",
        email: "landonw@smu.edu",
        RDHName: "Test RDH",
        soupKitchenName: "Test Soup Kitchen",
        address: "1111 Test Avenue Dallas, TX, 75205",
        verified: 1
    }

    render () {
        return (
            <div className="container w-50 my-2">
                <h2>My Profile</h2> 

                <div className="container w-50 my-3">
                    <div className="row">
                        <div className="col">
                            <img className="border border-dark" src="https://place-hold.it/150" alt="User profile pic"/>
                        </div>
                        <div className="col mt-4">
                            {(this.state.userType === 0 || this.state.userType === 1 || this.state.userType === 4) && 
                                <p className="d-inline-flex">
                                    <b>{this.state.userName}</b>
                                </p>    
                            }
                            {this.state.userType === 2 && 
                                <p className="d-inline-flex">
                                    <b>{this.state.soupKitchenName}</b>
                                </p>    
                            }
                            {this.state.userType === 3 && 
                                <p className="d-inline-flex">
                                    <b>{this.state.RDHName}</b>
                                </p>    
                            }
                            <p>{this.userTypes[this.state.userType]}</p>
                            {this.state.verified === 0 &&
                                <p><BsXLg className="mx-1"/> Not Verified</p>
                            }
                            {this.state.verified === 1 &&
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
                    {this.state.userType === 2 && 
                        <span className="mx-2">
                            {this.state.address}
                        </span>
                    }
                    {this.state.userType === 3 && 
                        <span className="mx-2">
                            {this.state.address}
                        </span>
                    }
                </div>


                {/*Make this navigate to edit profile form*/}
                <button type="button" className="btn btn-primary w-10 mb-4">Edit Profile</button>


                <ProfileTable></ProfileTable>
                {/* Table of each donations where this user is involved */}
            </div>

        )

    }

}

export default Profile;