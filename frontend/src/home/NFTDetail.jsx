import {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { getNFTById } from '../api/NFTApi';
import { blue } from '@mui/material/colors';
import './NFTDetail.css';


export const NFTDetail = ({ }) => {
    
    const [NFT, setNFT]=useState(undefined);

    const id=4;

    useEffect(()=>{
        getNFTById(id).then(x => setNFT(x));
    },[id]);

    if(!NFT){
        return<>Loading...</>
    }
    
    return<>
        <div className="container">
            <div className="image_url">
                <img className="rounded float-start" src="	https://5.imimg.com/data5/GV/NJ/MY-20565232/modern-art-paintings-250x250.jpg" alt="Card cap"></img>
            </div>
            <div className="NFTInfo">
                <div className="NFT"><h3>ID: {NFT[0].id}</h3></div>
                <div className="NFT"><h3>Name: {NFT[0].name}</h3></div>
                <div className="price">Price:$ {NFT[0].price}</div>
                <div className="description">Description: {NFT[0].description}</div>
                <div className="creator_id">Creator_id: {NFT[0].createor_id}</div>
                <div className="seller_id">Seller: {NFT[0].seller_id}</div>
                <div className="owner_id">Owner_id: {NFT[0].owner_id}</div>
                <br></br>
                <Stack spacing={2} direction="row">
                <Button variant="contained" color="neutral"><Link to='/' className="loginPage">Buy Now</Link></Button>
                <Button variant="contained" color="neutral"><Link to='/home' className="nftLink">Back</Link></Button>
                </Stack>
            </div>

        </div>
    
    </>



}