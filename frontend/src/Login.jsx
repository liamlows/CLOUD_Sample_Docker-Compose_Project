import React from 'react';

export class Login extends React.Component {

    state = {
        userName: "",
        password: "",
        attempts: 0,

    }

    // Axios submit credentials method
    // if else - if fail, attempts++


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
                <button className="btn btn-primary">Log In</button>
                <p className="my-3"> Don't have an account yet? Register <a href="#">here.</a> </p> {/*TODO: update href link*/}
            </div>
        );
    }

}