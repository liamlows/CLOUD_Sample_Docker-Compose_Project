import React from "react";
import axios from "axios";
export class BattleLog extends React.Component{
    state = {
        messages: []
    };
    getMessages(){
        var url = 'localhost'
        axios.get(`http://${url}:8000/getmessagesbyid`, 
        {
            battleID: this.props.battleID
        }).then(res => {
            console.log("posted message");
            console.log(res);
        }).catch(err => {
            console.log(err)
        });
    }
    render() {
        this.getMessages();
        return <div>
            <h2>Battle Log</h2>
            <div >Showing log for{this.props.battle}</div>
        </div>
    }
}