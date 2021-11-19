import React from "react";

export class MessageBox extends React.Component {
    state = {
        text: ""
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.props.onMessageSent(this.state.text);
        this.setState({text: ""});
    }
    handleChange = (e) => {
        this.setState({text: e.target.value});
    }

    render() {
        return <div>
            <h2>Send a Message!</h2>
            <form onSubmit={this.sendMessage}>
                <label htmlFor="inputMessage">Message</label>
                <input type="text" className="form-control" id="inputMessage" value={this.state.text} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    }
}