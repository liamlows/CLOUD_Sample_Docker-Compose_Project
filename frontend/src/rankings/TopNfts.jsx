import './rankings.css';
import * as React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllNFTsByPrice, getNFTs, } from '../api/NFTApi';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getUserById } from '../api/UsersAPI';

export const TopNfts = () => {

    const[ NFTs, setNFTs ] = useState([]);
    const[ lbuser, setlbuser ] = useState(undefined);
    var lbuserID;

    useEffect(() => {
        getNFTs().then(x => setNFTs(x));
    }, [ ]);

    useEffect(() => {
        getUserById(lbuserID).then(x => setlbuser(x));
    }, [ lbuserID ]);

    if(!NFTs){
        return<><Box sx={{ mx:"auto"}}>
        <CircularProgress color="secondary" />
        </Box></>
    }

    var place = 1;

    return(<div className="rankingContainer">
        <h5 className="rankingTitle">NFTs</h5>
        <Stack spacing={3}>
        <div class="row"/>
            {
                NFTs.map(NFT => <div key={NFT.id} class="row">
                    <div class="col-3">
                      {place++}. 
                      <Link to={`/NFT-details/${NFT.id}`} className="NFT">
                        <img src={NFT.image_url} width="60" height="60" alt=""/>
                      </Link>
                    </div>
                    <div class="col-3">
                        <Link to='/theirUser' className='createLink'>Creator: {getUserById(NFT.creator_id).username}</Link>
                    </div>
                    <div class="col-3">
                        <Link to='/theirUser' className='createLink'>Owner: {NFT.owner_id}</Link>
                    </div>
                    <div class="col-3">
                        ${NFT.price}
                    </div>
                        <Link to={`/NFT-details/${NFT.id}`} className="NFT">
                        </Link>
                        {/* history.push(pathname:`/NFT-details/${NFT.id}`); */}
                        <Link to={`/NFT-details/${NFT.id}`} className="NFT">
                        </Link>
                    </div>)
            }

            {/* <div class="row">
                <div class="col-3">
                    1. 
                    <img src="https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455__340.jpg" width="60" height="60"/>
                </div>
                <div class="col-3">
                    <Link to='/theirUser' className='createLink'>Creator</Link>
                </div>
                <div class="col-3">
                    <Link to='/theirUser' className='createLink'>Owner</Link>
                </div>
                <div class="col-3">
                    Value
                </div>
            </div> */}
        </Stack>
    </div>);
}