import React from 'react';
import { BattleList } from './BattleList';
import { Registration } from './Registration';
import Login from './Login';
import { BattleCreator } from './BattleCreator';

export class BattlePage extends React.Component {
    state = {
        currentUserID: "",
        battles: []
    };

    addBattle(battle){
        //TODO: AXIOS CALL TO DB TO STORE BATTLE
        //TODO: AXSIOS CALL TO DB FOR ALL BATTLES
        this.setState(prevState => {
            let battles = prevState.battles;
            console.log(battles);
            battles.push(battle);
            return{battles}
        })
    }
    render() {
        return <div>
            <Login/>
            <Registration/>
            <BattleList battles={this.state.battles}/>
            <BattleCreator onBattleAdded={ battle => this.addBattle(battle) }/>
        </div>
    }
}