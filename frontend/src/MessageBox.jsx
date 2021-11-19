import React from "react";
import axios from "axios";

export class MessageBox extends React.Component {
    state = {
        text: ""
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.props.onMessageSent(this.state.text);
        var url = 'localhost'
        var uniqueID = (new Date()).getTime().toString(36);
        axios.post(`http://${url}:8000/postmessage`, 
        {
            battleID: this.props.activeBattleID,
            message: this.state.text,
            senderID: this.props.userID,
            timestamp: null //TODO: make a timestamp
        }).then(res => {
            console.log("posted message");
            console.log(res);
        }).catch(err => {
            console.log(err)
        });
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