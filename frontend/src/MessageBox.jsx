import React from "react";

export class MessageBox extends React.Component {
    state = {
        text: ""
    };

    sendMessage() {
        this.props.onMessageSent(this.state.text);
    }

    render() {
        return <div>
            <h2>Send a Message!</h2>
            <form>
                <label htmlFor="inputMessage">Message</label>
                <input type="text" className="form-control" id="inputMessage" onChange={e => this.setState({text: e.target.value})}/>
            </form>
        </div>
    }
}