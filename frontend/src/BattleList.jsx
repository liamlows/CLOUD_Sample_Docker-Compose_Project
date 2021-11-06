/* eslint-disable no-lone-blocks */
import React from 'react';


export const BattleList = props => <>
    <h2>Battles</h2>


    {props.battles.length === 0 &&
        <div>
            No active battles
        </div>
    }
    <ul className="list-group">
        {props.battles.map(x =>
            <li className="list-group-item" key={x.id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{x.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{x.userID1}</h6>
                        <p class="card-text">{x.description}</p>
                    </div>
                </div>
            </li>
        )}
    </ul>
</>;