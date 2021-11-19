import React from 'react';
import { BattleList } from './BattleList';
import { Registration } from './Registration';
import { Login } from './Login';
import { BattleCreator } from './BattleCreator';
import { BattleLog } from './BattleLog';
import './styles/BattlePage.css'
import { MessageBox } from './MessageBox';
import { Message } from './models/Message';
import { v1 as uuidv1 } from 'uuid';
export class BattlePage extends React.Component {
    state = {
        loggedIn: false,
        needToRegister: false,
        activeBattle: {},
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
    setActiveBattle(battleID) {
        console.log(battleID);
        let battle = this.searchBattleID(battleID);
        console.log(battle[0]);
        this.setState({activeBattle: battle[0]});
    }
    searchBattleID(battleID){
        return this.state.battles.filter(battle => {
            return battle.id === battleID;
        })
    }
    
    setUserID(userID){
        this.setState({currentUserID: userID});
        this.setState({loggedIn: true})
    }
    sendMessage(text) {
        let message = new Message(uuidv1(), this.state.currentUserID, this.state.activeBattle.id, text, new Date());
        //axios call here
        
    }

    render() {
        return <div>
            {!this.state.loggedIn && !this.state.needToRegister && (
                <Login onLogin={userID => this.setUserID(userID)}/>
            )}
            {/* {!this.state.loggedIn && this.state.needToRegister && (
                <Registration onRegister={bool => this.toggleNeedToRegister(bool)}/>
            )} */}
            <div className="sidebar">
                {this.state.loggedIn && (
                    <div>
                        <BattleList onBattleSelected={battleID => this.setActiveBattle(battleID)} battles={this.state.battles}/>
                        <BattleCreator onBattleAdded={ battle => this.addBattle(battle)} userID={this.state.currentUserID}/>
                    </div>
                )}
            </div>
            <div className="battleLog">
                {this.state.loggedIn && this.state.activeBattle !== "" && (
                    <div>
                        <BattleLog battle={this.state.activeBattle} />
                        {this.state.activeBattle.userID1 === this.state.currentUserID && (
                            <MessageBox onMessageSent={text => this.sendMessage(text)}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    }
}