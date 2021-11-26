import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';

export class ProfileEditForm extends React.Component {

    accountsRepository = new AccountsRepository();

    userTypes = [
        "General User", 
        "Driver",
        "Soup Kitchen Owner",
        "RDH Owner",
        "Admin"
    ];

    state = {
        userId: 0,
        username: 'Landon Wood',
        userPassword: 'test_pass',
        userType: 3,
        imgURL: '',
        phoneNumber: '2146016524',
        email: 'landonw@smu.edu',
        address: "1111 Test Avenue",
        soupKitchenName: "Test Soup Kitchen", // We could get rid of soupkitchen name and RDH name fields
        RDHName: "Test RDH", // and just insert data for username that represents a SK or RDH name.
        validated: 0 // that would significantly reduce the amount of conditional rendering i'm having to do.
    }   // But it's also not that difficult to just do a join on userID and populate the corresponding state field.


    submitChanges() {
        // this.accountsRepository.
    }

    render() {
        return (
            <div className="container w-50 my-2"> 
                <h2>Edit Profile</h2>
                <form className="m-2">
                    <div className="container w-50">
                    <label htmlFor="username" className="form-label" >Change Username</label>
                        {this.state.userType === 2 && 
                            <input type="text" className="form-control my-1"  id="username" name="username" 
                                value={this.state.soupKitchenName}
                                placeholder={this.state.soupKitchenName}
                                onChange={ event => this.setState({ soupKitchenName: event.target.value})}
                            />
                        }
                        {this.state.userType === 3 && 
                            <input type="text" className="form-control my-1"  id="username" name="username" 
                                value={this.state.RDHName}
                                placeholder={this.state.RDHName}
                                onChange={ event => this.setState({ RDHName: event.target.value})}
                            />
                        }
                        {(this.state.userType === 0 || this.state.userType === 1 || this.state.userType === 4) && 
                            <input type="text" className="form-control my-1"  id="username" name="username" 
                                value={this.state.username}
                                placeholder={this.state.username}
                                onChange={ event => this.setState({ username: event.target.value})}
                            />
                        }
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
                    {(this.state.userType === 2 || this.state.userType === 3) &&
                        <div className="container w-50">
                            <label htmlFor="address" className="form-label">Change address</label>
                            <input type="text" className="form-control my-1" id="address" name="address" 
                                value={this.state.address}
                                placeholder={this.state.address}
                                onChange={ event => this.setState({ address: event.target.value})}
                            />
                        </div>
                    }
                    
                    <div className="container w-50">
                        <div className="row mt-4">
                            <div className="col">
                                <Link className="btn btn-danger" to={`/profile/1`}> Cancel </Link> {/* Need sessionstorage here!*/}
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary" onClick={ () => this.submitChanges() }>Confirm Changes</button> {/*Return to profile with changes*/} {/*Need sessionstorage to call route*/}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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

export default ProfileEditForm;