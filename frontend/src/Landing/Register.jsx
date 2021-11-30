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

    userTypesString = [
        "General User", 
        "Driver",
        "Soup Kitchen Owner",
        "RDH Owner",
        "Admin"
    ];

    userTypesMap = {
        "General User": 0,
        "Driver": 1,
        "Soup Kitchen Owner": 2,
        "RDH Owner": 3,
        "Admin": 4
    };

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
        console.log(this.userTypesMap[userType])
        let ut = this.userTypesMap[userType];
        console.log("ut: " + ut);

        this.setState(state => {
            state.userType = ut;
            return state;
        });
    }

    setImgURL(imgURL) {
        this.setState(state => {
            state.imgURL = imgURL;
            return state;
        });
    }

    async register() {
        await this.accountsRepository.register(this.state);
        // Use login route to get user id and user type
        const response = await this.accountsRepository.login(this.state)
        
        if (response) {
            sessionStorage.setItem("userID", response[0].userID);
            sessionStorage.setItem("userType", response[0].userType);
        }

        this.setState({redirect: true})
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
                            this.register();
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
                                        this.userTypesString.map((x, i) => <option key={ i }>{ x } </option>) // Can't figure out how to convert these to the userType Names.
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