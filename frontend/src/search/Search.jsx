import './search.css'
import * as React from 'react';
import { Button, TextField, Box, Divider, Stack, Avatar } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';

export const Search = () => {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

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
        <div className="row">
            <TextField id="outlined-basic" label="Begin Typing" variant="outlined" fullWidth/>
            <Button>Search</Button>
        </div>
        <Divider/>
        <h5 className="recent">Search results for: Query</h5>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
            <div className="item">
                <Stack direction = "row" spacing={90}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={90}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={90}>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
        </Stack>
    </div>);
}