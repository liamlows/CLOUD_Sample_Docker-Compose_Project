import React from "react";
import { Battle } from "./models/Battle";
import { v1 as uuidv1 } from 'uuid';

export class BattleCreator extends React.Component {
    state = {
        id: "",
        title: "",
        description: "",
        userID1: "",
        userID2: ""
    }

    addBattle(){
        //uuidv() makes a unique ID
        //need to somehow get current user ID
        this.props.onBattleAdded(new Battle(uuidv1(), this.state.title, this.state.description, this.state.userID1, this.state.userID2));
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