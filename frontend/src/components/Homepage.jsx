import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';


class HomePage extends React.Component{
    constructor(props){
        super(props);

    }

    render(){

        return(
        <div className="Main">
            <div className="MenuBar">
                <h1 className="header">NFT</h1>
                <ul>
                    <button className="Message">Message</button>
                    <button className="Account">Account</button>
                </ul>
            </div>
        
        <body>
            <div className="SearchBar"></div>
            <div className="CreateNFT"></div>

            <div className="DisplayCollects">
                <p id="FirstC" >
                        <img src="https://via.placeholder.com/250"></img>
                </p>
                <p id="SecondC">
                    <img src="https://via.placeholder.com/250"></img>
                </p>
                <p id="ThirdC">
                    <img src="https://via.placeholder.com/250"></img>
                </p>
            </div>
        </body>

        </div>
    
        );
    };

}
