import React from "react";
import { Battle } from "./models/Battle";
export class BattleCreator extends React.Component {
    state = {
        id: "",
        title: "",
        description: "",
        userID1: "",
        userID2: ""
    }

    addBattle(){
        this.props.onBattleAdded(new Battle(this.state.id, this.state.title, this.state.description, this.state.userID1, this.state.userID2));
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
                        <label htmlFor="inputName">Name</label>
                        <input type="text" className="form-control mb-3" id="inputName" onChange={e => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDescription">Description</label>
                        <input type="textArea" className="form-control mb-3" id="inputDescription" onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                </form>
                <button type="button" className="btn btn-primary" onClick={() => this.addBattle()}>Submit</button>
            </div>
        </>
    }
}