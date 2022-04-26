import { Box, Grid, TextField } from '@mui/material';
import './messages.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export const Compose = () => {
    return ( <div className="messageContainer">
        <br/>
        <h6 className="composeTo"> Compose To...</h6>
        <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth/>
        <br/><br/>
        <TextField id="outlined-multiline-flexible" rows={10} fullWidth multiline label="Your Message"/>
        <Grid container justifyContent="flex-end">
            <Link className="messageLink" to='/messages'><Button color="secondary">Send</Button></Link>
            <Link className="messageLink" to='/messages'><Button color="secondary">Delete</Button></Link>

        </Grid>
    </div>
    );
}