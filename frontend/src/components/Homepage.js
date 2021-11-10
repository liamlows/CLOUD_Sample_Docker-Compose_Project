import React, { useState } from 'react';

export class Homepage extends React.Component{
    render(){
    return (
        <>
        <h1>Sports League</h1>
        <h2>What league do you want to explore?</h2>
        <button>Login</button>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg"></img>
        </div>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg"></img>
        </div>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a6/Major_League_Baseball_logo.svg"></img>
        </div>
      </>
    )
    }
}