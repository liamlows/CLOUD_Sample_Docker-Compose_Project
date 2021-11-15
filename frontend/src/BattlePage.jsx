import React from 'react';
import { BattleList } from './BattleList';
import { Registration } from './Registration';
import Login from './Login';
import { BattleCreator } from './BattleCreator';

export class BattlePage extends React.Component {
    state = {
        battles: [],
        loggedIn: true
    };

    addBattle(battle){
        this.setState(prevState => {
            let battles = prevState.battles;
            console.log(battles);
            battles.push(battle);
            return{battles}
        })
    }
    render() {
        return <div>
            {!this.state.loggedIn && (
                <Login/>,
                <Registration/>
            )}
            {this.state.loggedIn && (
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <BattleList battles={this.state.battles}/>
                    </div>
                    <div className="p-2">
                        <BattleCreator onBattleAdded={ battle => this.addBattle(battle) }/>
                    </div>
                    
                </div>)}
            </div>
    }
}