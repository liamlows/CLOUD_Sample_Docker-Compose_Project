import './rankings.css';
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const TopUsers = () => {

    return(<div className="rankingContainer">
        <h5 className="rankingTitle">Users</h5>
        <Stack spacing={3}>
            <div class="row"/>
            <div class="row">
                <div class="col-4">
                    <Link to='/theirUser' className='createLink'>1. User</Link>
                </div>
                <div class="col-4">
                    Value
                </div>
                <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                        Follow
                    </Button>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <Link to='/theirUser' className='createLink'>2. User</Link>
                </div>
                <div class="col-4">
                    Value
                </div>
                <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                        Follow
                    </Button>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <Link to='/theirUser' className='createLink'>3. User</Link>
                </div>
                <div class="col-4">
                    Value
                </div>
                <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                        Follow
                    </Button>
                </div>
            </div>
        </Stack>
    </div>);
}