import React from 'react';

export class ProfileEditForm extends React.Component {

    state = {
        userName: 'Landon Wood',
        userPassword: 'test_pass',
        userType: 'RDH Manager',
        imgURL: '',
        phoneNumber: '2146016524',
        email: 'landonw@smu.edu',
        // Conditional rendering for soupkitchen/RDH fields
    }

    render() {
        // Fill fields with placeholder existing values from userID's info
        return (
            <div className="container w-50 my-2"> 
                <h2>Edit Profile</h2>
                <form className="m-2">
                    <div className="container w-50">
                        <label htmlFor="userName" className="form-label" >Change Username</label>
                        <input type="text" className="form-control my-1"  id="userName" name="userName" 
                            value={this.state.userName}
                            placeholder={this.state.userName}
                            onChange={ event => this.setState({ userName: event.target.value})}
                        />
                    </div>
                    <div className="container w-50">
                        <label htmlFor="userPassword" className="form-label">Change Password</label>
                        <input type="password" className="form-control my-1" id="userPassword" name="userPassword" 
                            value={this.state.userPassword}
                            placeholder={this.state.userPassword}
                            onChange={ event => this.setState({ userPassword: event.target.value})}
                        />
                    </div>
                    <div className="container w-50">
                        <label htmlFor="phoneNumber" className="form-label">Change Phone Number</label>
                        <input type="text" className="form-control my-1" id="phoneNumber" name="phoneNumber" 
                            value={this.state.phoneNumber}
                            placeholder={this.state.phoneNumber}
                            onChange={ event => this.setState({ phoneNumber: event.target.value})}
                        />
                    </div>
                    <div className="container w-50">
                        <label htmlFor="email" className="form-label">Change Email</label>
                        <input type="text" className="form-control my-1" id="email" name="email" 
                            value={this.state.email}
                            placeholder={this.state.email}
                            onChange={ event => this.setState({ email: event.target.value})}
                        />
                    </div>
                    <div className="container w-50">
                        <div className="row mt-4">
                            <div className="col">
                                <button type="button" className="btn btn-danger">Cancel</button> {/*Return to profile with no changes*/}
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary">Confirm Changes</button> {/*Return to profile with changes*/}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default ProfileEditForm;