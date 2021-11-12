import React from 'react';
import { BattleList } from './BattleList';
import { Registration } from './Registration';
import Login from './Login';

export class BattlePage extends React.Component {
    state = {
        battles: []
    };

    render() {
        return <div>
            <Login/>
            <Registration/>
            <BattleList battles={this.state.battles}/>
        </div>
    }
}