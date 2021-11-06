import React from 'react';
import { BattleList } from './BattleList';
import Login from './Login';

export class BattlePage extends React.Component {
    state = {
        battles: []
    };

    render() {
        return <div>
            <Login/>
            <BattleList battles={this.state.battles}/>
        </div>
    }
}