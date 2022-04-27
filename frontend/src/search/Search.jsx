import './search.css'
import * as React from 'react';
import { Button, TextField, Box, Divider, Stack, Avatar } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { getUsers } from '../api/UsersAPI';
import CircularProgress from '@mui/material/CircularProgress';

export const Search = () => {

    const [alignment, setAlignment] = useState('web');
    // const [usersChosen, setUsersChosen] = useState(true);
    // const [NFTsChosen, setNFTsChosen] = useState(false);
    const[ users, setUsers ] = useState([]);


    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        // if (usersChosen) {
        //     setUsersChosen (false);
        //     setNFTsChosen (true);
        // } else {
        //     setUsersChosen(true);
        //     setNFTsChosen(false);
        // }
    };

    // useEffect(() => {
    //     getUsers().then(x => setUsers(x));
    // }, []);

    if(!users){
        return<><Box sx={{ mx:"auto"}}>
        <CircularProgress color="secondary" />
        </Box></>
    }

    const handleChangeSearch=(e)=>{
        setUsers(e.target.value);
    }

    return(<div className="searchContainer">
        <h4 className="searchHead">Search for your favorite Users or NFTs!</h4>
        <Box textAlign='center'>
        <ToggleButtonGroup
            className="toggle"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            >
            <ToggleButton value="User">User</ToggleButton>
            <ToggleButton value="NFT">NFT</ToggleButton>
        </ToggleButtonGroup>
        </Box>
        <TextField id="outlined-basic" label="Begin Typing" variant="outlined" fullWidth
        value={users} onChange={handleChangeSearch}/>
        <br/>
        <br/>
        <Divider/>
        <br/><br/>
        
        {
                users.map(user => <div key={user.id} class="row">
                    <div class="col-4">
                      <Link to={'/theirUser'} className="createLink">
                          Username
                      </Link>
                    </div>
                    <div class="col-4">
                        Name
                    </div>
                    <div class="col-4">
                        Short Description
                    </div>
                    </div>)
            }

        {/* <Stack justifyContent="center" alignItems="center" spacing={2}>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <h6>Name</h6>
                    <h6>Short Description</h6>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <h6>Name</h6>
                    <h6>Short Description</h6>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <h6>Name</h6>
                    <h6>Short Description</h6>
                </Stack>
            </div>
        </Stack> */}
    </div>);
}