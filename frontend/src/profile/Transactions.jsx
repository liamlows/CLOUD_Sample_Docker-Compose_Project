import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Box, TextField } from '@mui/material';

export const Transactions = () => {
    return (<div className="profileContainer">
         <Box textAlign='center'>
        <h4 className="editHead">Purchase NFT</h4>

    <img src="https://cdn.pixabay.com/photo/2017/08/04/17/56/dolomites-2580866__480.jpg" width="100rem" height="100rem"/>
    <br/> <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Credit Card Number"/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Expiration Date"/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Security Code"/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="ZIP Code"/>
    <br/>
    <br/>

    <Button variant="outlined"><Link to='/theirUser' className="createLink">Cancel</Link></Button>
    <Button variant="outlined"><Link to='/profile' className="createLink">Purchase</Link></Button>
    
    </Box>
    </div>);
}