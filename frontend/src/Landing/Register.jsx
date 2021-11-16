import React from 'react';

export class Register extends React.Component {

    userTypes = [1, 2, 3, 4] // Double check with DB team on what int IDs correspond to what user type
                            // Will have to map ints to strings probably

    state = {
        userType: "",
        userName: "",
        password: "",
        phone: "",
        email: ""
    }

    // Are we going to have register pages for different types of users?
    // Same register page, just change the form elements based on what the user selects for user type?
    // For now, just simple user form

    // on submit click: post route to users table


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
                        <label htmlFor="userName" className="form-label"> New Username </label>
                        <input type="text" className="form-control my-1" id="userName" name="userName" 
                            value={this.state.userName}
                            onChange={ event => this.setState({ userName: event.target.value})}
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
                </form>
                <button className="btn btn-primary">Create Account</button>
                <p className="my-3"> Already have an account? Log in <a href="#">here.</a> </p> {/*TODO: update href link*/}
            </div>
        );
    }

}

export default Register;