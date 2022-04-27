import {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { getNFTById } from '../api/NFTApi';
import { blue } from '@mui/material/colors';
import './NFTDetail.css';
import{React} from 'react';
import {useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const NFTDetail = () => {
    
    const [NFT, setNFT]=useState(undefined);
    const params =useParams();

    useEffect(()=>{
        if(params.id){
        getNFTById(params.id).then(x => setNFT(x));
        }
    },[ ]);

    if(!NFT){
        return<><Box sx={{ mx:"auto"}}>
        <CircularProgress color="secondary" />
        </Box></>
    }
    return<>
        <div className="container-nft">
            <div className="nft_image_url">
                <img className="rounded float-start" src={NFT[0].image_url} alt="Card cap"></img>
            </div>
            <div className="NFTInfo">
                <div className="NFT"><h3>ID: {NFT[0].id}</h3></div>
                <div className="NFT"><h3>Name: {NFT[0].name}</h3></div>
                <div className="price"><AttachMoneyIcon/> {NFT[0].price}</div>
                <div className="description">Description: {NFT[0].description}</div>
                <div className="creator_id">Creator_id: {NFT[0].creator_id}</div>
                <div className="seller_id">Seller: {NFT[0].seller_id}</div>
                <div className="owner_id">Owner_id: {NFT[0].owner_id}</div>
                <br></br>
                <Stack spacing={2} direction="row">
                <Button variant="contained" color="neutral"><Link to='/transaction' className="loginPage">Buy Now</Link></Button>
                <Button variant="contained" color="neutral"><Link to='/home' className="nftLink">Back</Link></Button>
                </Stack>
            </div>

        </div>
    
    </>

}