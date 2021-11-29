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
        username: "",
        userPassword: "",
        userType: 0,
        imgURL: '',
        phoneNumber: '',
        email: '',
        validated: 0,
        redirect: false,
        //address : ""
    }   

    submitChanges() {
        this.accountsRepository.updateUser(sessionStorage.userID, this.state)
        .then(this.setState({redirect: true}))
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={`/myprofile/`}/>
        }

        return (
            <div className="container w-50 my-2"> 
                <h2>Edit Profile</h2>
                <form className="m-2" id="edit-form"
                    onSubmit={
                        (e) => {
                            this.submitChanges();
                            e.preventDefault();
                        }
                    }
                >
                    <div className="container w-50">
                        <label htmlFor="username" className="form-label" >Change Username</label>
                        {/* {this.state.userType === 2 && 
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
                        } */}
                        {/* {(this.state.userType === 0 || this.state.userType === 1 || this.state.userType === 4) &&  */}
                            <input type="text" className="form-control my-1"  id="username" name="username"
                                value={this.state.username}
                                placeholder={this.state.username}
                                onChange={ event => this.setState({ username: event.target.value})}
                            />
                        {/* } */}
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
                        <label htmlFor="imgURL" className="form-label">Change Profile Picture URL</label>
                        <input type="text" className="form-control my-1" id="imgURL" name="imgURL" 
                            value={this.state.imgURL}
                            placeholder={this.state.imgURL}
                            onChange={ event => this.setState({ imgURL: event.target.value})}
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
                    {/* {(this.state.userType === 2 || this.state.userType === 3) &&
                        <div className="container w-50">
                            <label htmlFor="address" className="form-label">Change address</label>
                            <input type="text" className="form-control my-1" id="address" name="address" 
                                value={this.state.address}
                                placeholder={this.state.address}
                                onChange={ event => this.setState({ address: event.target.value})}
                            />
                        </div>
                    } */}
                    
                    <div className="container w-50">
                        <div className="row mt-4">
                            <div className="col">
                                <Link className="btn btn-danger" to={`/myprofile/`}> Cancel </Link>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-primary" form="edit-form">Confirm Changes</button>
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