import React from 'react';
import {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getNFTById } from '../api/NFTApi';
import './NFTDetail.css';

export const NFTDetail = ({ NFTId }) => {
    // const [NFT, setNFT]=useState(undefined);

    // let NFTId=1;
    // useEffect(()=>{
    //     getNFTById(NFTId).then(x => setNFT(x));

    // },[NFTId]);

    // if(!NFT){
    //     return<>Loading...</>
    // }
    
    return<>
        <div className="container fixed">
            <div className="image_url">
                <img className="rounded float-start" src="	https://5.imimg.com/data5/GV/NJ/MY-20565232/modern-art-paintings-250x250.jpg" alt="Card cap"></img>
            </div>
            <div className="NFTInfo">
                <div className="NFTName"><h3>NFT.name</h3></div>
                <div className="price">NFT.price</div>
                <div className="description">NFT.description</div>
                <div className="creator_id">NFT.createor_id</div>
                <div className="seller_id">NFT.seller_id</div>
                <div className="owner_id">NFT.owner_id</div>
                <br></br>
                <div className="buttonRow">
                <Button variant="contained" color="success"><Link to='/' className="loginPage">Buy</Link></Button>
                <Button variant="contained"><Link to='/home' className="nftLink">Back</Link></Button>
                </div>
            </div>

        </div>
    
    </>



}