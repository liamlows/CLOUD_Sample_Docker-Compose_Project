import { TextField } from '@mui/material';
import './messages.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const DM = () => {
    return (<div className="messageContainer">
        <h4 className= "messageHead">Username</h4>
        <Link to ='/messages' className="returnLink">Return</Link>

        <Box className="theirMessage" component ="div">
            <div>Their Message</div>
        </Box>

        <Box className="yourMessage" component ="div">
            <div>Your Message</div>
        </Box>

        <Box className="theirMessage" component ="div">
            <div>Their Message</div>
        </Box>

        <Box className="yourMessage" component ="div">
            <div>Your Message</div>
        </Box>

        <Box className="theirMessage" component ="div">
            <div>Their Message</div>
        </Box>

        <Box className="yourMessage" component ="div">
            <div>Your Message</div>
        </Box>

        <TextField id="outlined-multiline-flexible" fullWidth multiline label="Your Message"/>
        <Button>Send</Button>
    </div>
    );
}