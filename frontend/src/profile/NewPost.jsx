import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const NewPost = () => {
    return (<div className="container">
            <h3 className="editHead">New Post</h3>
            <br/><br/>
            <Button variant="outlined" color="secondary">Upload Image (optional)</Button>
            <br/>
            <br/>
            <TextField id="outlined-multiline-flexible" fullWidth multiline label="Write what you want to say..."/>
            <br/><br/>
            <h5>For Sale?</h5>
            <Switch color="secondary" {...label} />
            <br/><br/>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Set Price"
                />
            </FormControl>
            <br/><br></br>
            <Button variant="outlined" color="secondary"><Link to='/profile' className="postLink">Post</Link></Button>
            {/* during functionality, show price setter only if toggle is set to true*/}
        </div>
    );
}