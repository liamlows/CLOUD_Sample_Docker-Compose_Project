import React from 'react';
import { ProfileTable } from './ProfileTable';
import { ProfileEditForm } from './ProfileEditForm';

export class Profile extends React.Component {

    state = {
        userName: "Landon Wood",
        userType: "RDH Manager", // This will need to be an int map to strings
        phoneNumber: "2146016524",
        email: "landonw@smu.edu",
    }

    render () {
        // Based on what user type is, render more information such as soupKitchenName, address, validated, RDHType, etc.
        return (
            <div className="container w-50 my-2">
                <h2>My Profile</h2> 
                <div className="container w-50 my-3">
                    <div className="row">
                        <div className="col">
                            <img className="border border-dark" src="https://place-hold.it/150" alt="User profile "/>
                        </div>
                        <div className="col mt-4">
                            <p className="d-inline-flex">{this.state.userName}</p>
                            <p>{this.state.userType}</p>
                        </div>
                    </div>
                </div>
                <p>Phone number: {this.state.phoneNumber} </p> {/* https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/41318684 */}
                <p>Email: {this.state.email}</p>

                {/*Make this navigate to edit profile form*/}
                <button type="button" className="btn btn-secondary w-10 mb-4">Edit Profile</button>


                <ProfileTable></ProfileTable>
                {/* Table of each donations where this user is involved */}
            </div>

        )

    }

}

export default Profile;