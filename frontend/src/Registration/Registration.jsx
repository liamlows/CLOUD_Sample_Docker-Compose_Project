import React from 'react';

export class AccountEditor extends React.Component {

    state = {
        name: '',
        email: '',
        password: ''
    };

    

    render() {
        return <>
        <form className="container">
                <h1>Account Registration</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={ event => this.setState({ name: event.target.value }) }
                        className="form-control" />
                </div>


                <div className="form-group">
                    <label htmlFor="password">Password (8 characters minimum): </label>
                    <input type="password"
                        id="pass"
                        name="password"
                        minlength="8" required
                        value={this.state.password}
                        onChange={ event => this.setState({ password: event.target.value }) }
                        className="form-control" />
                </div>

            </form>
        </>;
    }
}