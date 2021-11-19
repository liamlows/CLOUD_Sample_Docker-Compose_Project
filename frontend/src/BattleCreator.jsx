import React from "react";
import axios from "axios";
import { Battle } from "./models/Battle";
export class BattleCreator extends React.Component {
    state = {
        title: "",
        description: ""
    }

    addBattle(){
        //uuidv() makes a unique ID
        //need to somehow get current user ID
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
            console.log("response");
            console.log(res);
            }).catch(err => {
            console.log(err)
            });;
        }

    render() {
        return <>
            <div className="list-group">
                <h2 className="list-group-item" >Add Battle</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control mb-3" id="inputTitle" onChange={e => this.setState({title: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="inputDescription">Description</label>
                        <textarea className="form-control" rows="3" id="inputDescription" onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                </form>
                <button type="button" className="btn btn-primary" onClick={() => this.addBattle()}>Submit</button>
            </div>
        </>
    }
}