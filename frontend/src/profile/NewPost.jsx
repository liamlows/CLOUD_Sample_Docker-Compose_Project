import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {useState,useEffect} from 'react';
import { postNFT } from '../api/AuthenAPI';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const NewPost = () => {

    const [name,setName]=useState(undefined);
    const [price,setPrice]=useState(undefined);
    const [image_url, setImage]=useState(undefined);
    const [submit,setSubmitted]=useState(false);
    const [error, setError] = useState(false);
    
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
      };

      // Handling the email change
    const handlePrice = (e) => {
        setPrice(e.target.value);
        setSubmitted(false);
      };
     
      // Handling the password change
    const handleImage = (e) => {
        setImage(e.target.value);
        setSubmitted(false);
      };
    
    const handleSubmit = () => {
        //e.preventDefault();
        if (name === '' || price === '' || image_url=== '') {
          setError(true);
          window.alert("Fail to post");
        } else {
            setSubmitted(true);
            setError(false);
            postNFT(name, price, image_url);
        }
    };

    return (<div className="container" align='center'>
            <h3 className="editHead">New Post</h3>
            <br></br>
            {/* <Button variant="outlined" color="secondary">Upload Image (optional)</Button> */}
            <TextField id="demo-helper-text-misaligned" label="NFT Name" value={name} onChange={handleName}/>
            <br/>
            <br/>

            <FormControl sx={{ m: 0 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Set Price"
                    value={price}
                    onChange={handlePrice}
                />
            </FormControl>

            {/* <TextField id="demo-helper-text-misaligned" label="NFT Price" value={price} onChange={handlePrice}/> */}
            <br/>
            <br>
            </br>
            <TextField id="demo-helper-text-misaligned" label="NFT url" value={image_url} onChange={handleImage}/>
            <br/>
            <br></br>
            <h5>For Sale?</h5>
            <Switch color="secondary" {...label} />
            <br></br>
            <Button variant="contained" color="secondary" onChange={handleSubmit}><Link to='/profile' className="postLink">Post</Link></Button>
            {/* during functionality, show price setter only if toggle is set to true*/}
        </div>
    );
}