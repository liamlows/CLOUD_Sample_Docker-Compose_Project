import './rankings.css';
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/UsersAPI';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";

export const TopUsers = () => {
    const[ users, setUsers ] = useState(undefined);

    useEffect(() => {
        getUsers().then(x => setUsers(x));
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
                    <div class="col-4">
                      {place++}. 
                      <Link to={`/user/${user.id}`} className="createLink">
                        {user.username}
                      </Link>
                    </div>
                    <div class="col-4">
                        ${user.balance}
                    </div>
                    <div class="col-4">
                    <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                        Follow
                    </Button>
                    </div>
                    </div>)
            }
        </Stack>
    </div>);
}