import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';

export class Login extends React.Component {

    accountsRepository = new AccountsRepository();

    state = {
        userName: "",
        password: "",
        attempts: 0,

    }

    login() {
        this.accountsRepository.getUsers().then(console.log("yes"));
    }

    render() {
        return ( 
            <div className="container w-50 my-2">
                <h2>Login</h2>
                <form className="m-2">
                    <div className="container w-50">
                        <label htmlFor="userName" className="form-label"> Username </label>
                        <input type="text" className="form-control my-1" id="userName" name="userName" 
                            value={this.state.userName}
                            onChange={ event => this.setState({ userName: event.target.value})}
                        />
                    </div>
                    <div className="container w-50">
                        <label htmlFor="password" className="form-label"> Password </label>
                        <input type="password" className="form-control my-1" id="password" name="password" 
                            value={this.state.password}
                            onChange={ event => this.setState({ password: event.target.value})}
                        />
                    </div>
                </form>
                <button type="button" className="btn btn-primary mt-2"
                    onClick={ () => this.login()}
                >
                    Log In
                </button>
                <p className="my-3"> Don't have an account yet? Register <Link to={`/register`}>here.</Link> </p>
            </div>
        );
    }

}

export default Login;