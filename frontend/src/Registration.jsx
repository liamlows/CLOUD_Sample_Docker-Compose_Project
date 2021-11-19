import React from 'react';
import './styles/Registration.css';
import { Link, Redirect } from 'react-router-dom';

export class Registration extends React.Component {

    state = {
        name: '',
        email: '',
        password: ''
    };

    regiDone(){
        alert('registration done');
    }
    

    render() {
        return <>
        <section id="Registration">
            <h1>SETUP YOUR FLAME WAR ACCOUNT</h1>
            <form className="container">
                    <div className="form-group">
                        <input type="info"
                            id="name"
                            name="name"
                            value={this.state.name}
                            placeholder={"Username"}
                            onChange={ event => this.setState({ name: event.target.value }) }
                            className="form-control" />
                    </div>


                    <div className="form-group">
                        <input type="info"
                            id="pass"
                            name="password"
                            minlength="8" required
                            value={this.state.password}
                            placeholder={"Password (8 characters minimum"}
                            onChange={ event => this.setState({ password: event.target.value }) }
                            className="form-control" />
                    </div>

            </form>

            <button onClick={e => this.regiDone()}>
                Login
            </button>
            <p>nevermind, take me to <Link to={"/"}>LOGIN</Link></p>
        </section>
        
        </>;
    }
}