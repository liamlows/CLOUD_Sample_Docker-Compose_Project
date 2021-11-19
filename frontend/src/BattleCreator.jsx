import React from "react";
import axios from "axios";
import { Battle } from "./models/Battle";
export class BattleCreator extends React.Component {
    state = {
        title: "",
        description: ""
    }

    addBattle = (e) => {
        //uuidv() makes a unique ID
        //need to somehow get current user ID
        e.preventDefault();
        var url = 'localhost'
        var uniqueID = (new Date()).getTime().toString(36);
        this.props.onBattleAdded(new Battle(uniqueID, this.state.title, this.state.description, this.props.userID, undefined));
        axios.post(`http://${url}:8000/makeBattle`, 
        {
            battleTopic: this.state.title,
            battleDescription: this.state.description,
            user1: this.props.userID,
            user2: null
        }).then(res => {
            console.log("added battle");
            console.log(res);
        }).catch(err => {
            console.log(err)
        });
        this.setState({title: ""});
        this.setState({description: ""});
    };


    render() {
        return <>
            <div className="list-group">
                <h2 className="list-group-item" >Add Battle</h2>
                <form onSubmit={this.addBattle}>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control mb-3" id="inputTitle" value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="inputDescription">Description</label>
                        <textarea className="form-control" rows="3" id="inputDescription" value={this.state.description} onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    }
}