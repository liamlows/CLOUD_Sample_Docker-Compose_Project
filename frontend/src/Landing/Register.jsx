import React from 'react';
import { Link } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';

export class Register extends React.Component {

    accountsRepository = new AccountsRepository();

    userTypes = [
        "General User", 
        "Driver",
        "Soup Kitchen Owner",
        "RDH Owner",
        "Admin"
    ];

    state = {
        userType: "",
        username: "",
        password: "",
        phone: "",
        email: ""
    }

    

    submit() {
        this.accountsRepository.register(this.state).then(console.log("yes"));
    }

    //test if adding the missing fields imgurl and validated allows for a post to occur.
    // the route is working.
    // could be how we're passing in parameters to register.

    render() {
        return ( 
            <div className="container w-50 my-2">
                <h2>Create New Account</h2>
                <form className="my-4">
                    <div className="container w-50 my-1">
                        <label htmlFor="userType" className="form-label">Account Type</label>
                        <select id="userType" name="userType" className="form-control"
                            value={this.state.userType}
                            onChange={ event => this.setState({ userType: event.target.value })}
                        >
                            <option></option> 
                                    {
                                        this.userTypes.map((x, i) => <option key={ i }>{ x }</option>)
                                    }
                        </select>
                    </div>
                    <div className="container w-50 my-1">
                        <label htmlFor="username" className="form-label"> New Username </label>
                        <input type="text" className="form-control my-1" id="username" name="username" 
                            value={this.state.username}
                            onChange={ event => this.setState({ username: event.target.value})}
                        />
                    </div>
                    <div className="container w-50 my-1">
                        <label htmlFor="password" className="form-label"> New Password </label>
                        <input type="password" className="form-control my-1" id="password" name="password" 
                            value={this.state.password}
                            onChange={ event => this.setState({ password: event.target.value})}
                        />
                    </div>
                    <div className="container w-50 my-1">
                        <label htmlFor="phone" className="form-label"> Phone Number </label>
                        <input type="text" className="form-control my-1" id="phone" name="phone" 
                            value={this.state.phone}
                            onChange={ event => this.setState({ phone: event.target.value})}
                        />
                    </div>
                    <div className="container w-50 my-1">
                        <label htmlFor="email" className="form-label"> Email </label>
                        <input type="email" className="form-control my-1" id="email" name="email" 
                            value={this.state.email}
                            onChange={ event => this.setState({ email: event.target.value})}
                        />
                    </div>
                    <button className="btn btn-primary" onSubmit={() => this.submit()}>Create Account</button>
                </form>

                <p className="my-3"> Already have an account? Log in <Link to={`/`}>here.</Link></p> {/*TODO: update href link*/}
            </div>
        );
    }

}

export default Register;