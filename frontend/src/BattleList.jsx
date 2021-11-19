/* eslint-disable no-lone-blocks */
import React from 'react';
import axios from 'axios';
import './styles/BattleList.css';

export class BattleList extends React.Component {
    joinBattle() {
        console.log("joining battle");
        //axios call to add userID2 to battle by id
        // var url = 'localhost'
        // axios.post(`http://${url}:8000/makeBattle`, 
        // {
        //     battleTopic: this.state.title,
        //     battleDescription: this.state.description,
        //     user1: this.props.userID,
        //     user2: null
        // }).then(res => {
        //     console.log("response");
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err)
        // });
    }
    render() {
        return <div>
            {this.props.battles.length === 0 &&
                <div>
                    No active battles
                </div>
            }
            <div className="list-group ">
                {this.props.battles.map(x =>
                    <div className="list-group-item" key={x.id}>
                        <div className="card" onClick={e => this.props.onBattleSelected(x.id)}>
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">USER NAME vs USER NAME TODO</h6>
                                <p className="card-text">{x.description}</p>
                            </div>
                            {x.userID2 === undefined && (
                                <form>
                                    <button type="button" onClick={this.joinBattle(x.id)}>Join Battle</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    }
};