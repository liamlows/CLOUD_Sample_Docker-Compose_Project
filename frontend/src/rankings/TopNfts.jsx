import './rankings.css';
import * as React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const TopNfts = () => {

    return(<div className="rankingContainer">
        <h5 className="rankingTitle">NFTs</h5>
        <Stack spacing={3}>
        <div class="row"/>
            <div class="row">
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
            </div>

            <div class="row">
                <div class="col-3">
                    2. 
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
            </div>

            <div class="row">
                <div class="col-3">
                    3. 
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
            </div>
        </Stack>
    </div>);
}