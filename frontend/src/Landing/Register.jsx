import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountsRepository';

export class Register extends React.Component {

    accountsRepository = new AccountsRepository();

    userTypes = [
        0, // "General User", 
        1, //"Driver",
        2, // "Soup Kitchen Owner",
        3, // "RDH Owner",
        4, //"Admin"
    ];

    state = {
        userType: 0,
        username: "",
        userPassword: "",
        phoneNumber: "",
        email: "",
        imgURL: "",
        redirect: false
    }

    setPhoneNumber(phoneNumber) {
		this.setState(state => {
			state.phoneNumber = phoneNumber;
			return state;
		});
	}

	setEmail(email) {
		this.setState(state => {
			state.email = email;
			return state;
		});
	}

	setUsername(username) {
		this.setState(state => {
			state.username = username;
			return state;
		});
	}

	setUserPassword(password) {
		this.setState(state => {
			state.userPassword = password;
			return state;
		});
	}

    setUserType(userType) {
        this.setState(state => {
            state.userType = userType;
            return state;
        });
    }

    setImgURL(imgURL) {
        this.setState(state => {
            state.imgURL = imgURL;
            return state;
        });
    }

    render() {

        
        if (this.state.redirect) {
            return <Redirect to={ `/donations/` }/>
        }

        return ( 
            <div className="container w-50 my-2">
                <form id="register-form" className="my-4"
                    onSubmit={ 
                        (e) => {
                            this.accountsRepository.register(this.state)
                                .then(() => this.setState({ redirect: true }));
                            e.preventDefault();
                        } 
                    }> 
                    <h2>Create New Account</h2>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="userType" className=" ">Account Type</label>
                        <select id="userType" name="userType" className="form-control"
                            onChange={ e => this.setUserType(e.target.value)}
                        >
                                    {
                                        this.userTypes.map((x, i) => <option key={ i }>{ x } </option>) // Can't figure out how to convert these to the userType Names.
                                    }                                                                   {/* The problem is that the conversion has to be done when setting state, can't just ahve strings here and convert to ints later. */}
                        </select>
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="username" className=" "> New Username </label>
                        <input type="text" className="form-control my-1" id="username" name="username" 
                            onChange={ e => this.setUsername(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="userPassword" className=" "> New Password </label>
                        <input type="password" className="form-control my-1" id="userPassword" name="userPassword" 
                            onChange={ e => this.setUserPassword(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="imgURL" className=" "> Profile Picture URL </label>
                        <input type="text" className="form-control my-1" id="imgURL" name="imgURL" 
                            onChange={ e => this.setImgURL(e.target.value)}
                        />
                    </div>

                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="phoneNumber" className=" "> Phone Number </label>
                        <input type="text" className="form-control my-1" id="phoneNumber" name="phoneNumber" 
                            onChange={ e => this.setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="email" className=" "> Email </label>
                        <input type="email" className="form-control my-1" id="email" name="email" 
                            onChange={ e => this.setEmail(e.target.value)}
                        />
                    </div>
                
                </form>
                <button type="submit" className="btn btn-primary" form="register-form">Create Account</button>
                <p className="my-3"> Already have an account? Log in <Link to={`/`}>here.</Link></p>

            </div>
        );
    }

}

export default Register;