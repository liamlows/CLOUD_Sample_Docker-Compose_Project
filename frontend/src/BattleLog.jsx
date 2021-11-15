import React from "react";

export class BattleLog extends React.Component{

    render() {
        return <div>
            <h2>Battle Log</h2>
            TODO: GET A BATTLE MESSAGES BY USING AXIOS CALL ON BATTLE ID
            <div >Showing log for{this.props.battle.id}</div>
        </div>
    }
    /* {props.battle.messages.length === 0 &&
        <div>
            No messages
        </div>
    }
    <div className="list-group">
        {props.battle.messages.map(message =>
            <div className="list-group-item">

            </div>
        )}
    </div> */
}