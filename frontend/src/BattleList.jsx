/* eslint-disable no-lone-blocks */
import React from 'react';


export const BattleList = props => <>
    <h2>Battles</h2>


    {props.battles.length === 0 &&
        <div>
            No active battles
        </div>
    }
    <div className="list-group">
        {props.battles.map(x =>
            <div className="list-group-item" key={x.id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{x.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{x.userID1}</h6>
                        <p className="card-text">{x.description}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
</>;