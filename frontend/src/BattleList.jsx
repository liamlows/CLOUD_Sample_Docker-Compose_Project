/* eslint-disable no-lone-blocks */
import React from 'react';
import './styles/BattleList.css';

export class BattleList extends React.Component {

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
                        </div>
                    </div>
                )}
            </div>
        </div>
    }
};