import axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';

export class Login extends React.Component {

    accountsRepository = new AccountsRepository();

    state = {
        username: "",
        userPassword: "",
        redirect: false
    }

    setUsername(username) {
        this.setState(s => {
            s.username = username;
            return s
        });
    };

    setUserPassword(userPassword) {
        this.setState(s => {
            s.userPassword = userPassword;
            return s
        });
    };


    async login() {
        const response = await this.accountsRepository.login(this.state);

        if (response) {
            // console.log(response.status);
            sessionStorage.setItem("userID", response[0].userID);
        }

        this.setState({redirect: true});


    }


    render() {

        if (this.state.redirect) {
            return <Redirect to={ `/donations/` }/>
        }

        return ( 
            <div className="container w-50 my-2">
                <h2>Login</h2>
                <form className="m-2" id="login-form"
                    onSubmit={
                        (e) => {
                            this.login();
                            e.preventDefault();
                        }
                        
                        
                    }
                >
                    <div className="container w-50 form-label-group">
                        <label htmlFor="username"> Username </label>
                        <input type="text" className="form-control my-1" id="username" name="username" 
                            onChange={ e => this.setUsername(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 form-label-group">
                        <label htmlFor="password"> Password </label>
                        <input type="password" className="form-control my-1" id="userPassword" name="userPassword" 
                            onChange={ e => this.setUserPassword(e.target.value)}
                        />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary mt-2" form="login-form">Log In</button>
                <p className="my-3"> Don't have an account yet? Register <Link to={`/register`}>here.</Link></p>
            </div>
        );
    }

}

export default Login;