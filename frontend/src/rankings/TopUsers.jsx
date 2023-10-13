import './rankings.css';
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUserLB } from '../api/UsersAPI';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";

export const TopUsers = () => {
    const[ users, setUsers ] = useState(undefined);

    useEffect(() => {
        getUserLB().then(x => setUsers(x[0]));
    }, [ ]);

    if(!users){
        return<><Box sx={{ mx:"auto"}}>
        <CircularProgress color="secondary" />
        </Box></>
    }
    var place = 1;

    return(<div className="rankingContainer">


        <h5 className="rankingTitle">Users</h5>
        <Stack spacing={3}>
            <div class="row"/>

            {
                users.map(user => <div key={user.id} class="row">
                    <div class="col-3">
                      {place++}. 
                      <Link to={`/user/${user.id}`} className="NFT">
                        <img src={user.photo} width="60" height="60" alt=""/>
                      </Link>
                    </div>
                    <div class="col-3">
                      <Link to={`/user/${user.id}`} className="createLink">
                        {user.username}
                      </Link>
                    </div>
                    <div class="col-3">
                        ${user.val}
                    </div>
                    <div class="col-3">
                        <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                            Follow
                        </Button>
                    </div>
                    </div>)
            }
        </Stack>
    </div>);
}