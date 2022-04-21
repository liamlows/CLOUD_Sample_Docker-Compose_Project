import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import './create.css';
import { Link } from 'react-router-dom';

export const CreateAccount = () => {
    return(<div className='Login-component'>
    <div className="whiteBox">
    <h1>Create Account</h1>
    <br/>
    <TextField helperText="Please choose a username" id="demo-helper-text-misaligned" label="Username"/>
    <br/>
    <br/>
    <TextField helperText="Please enter your email" id="demo-helper-text-misaligned" label="Email"/>
    <br/>
    <br/>
    <TextField helperText="Please choose a password" id="demo-helper-text-misaligned" label="Password"/>
   <br/> <br/> <br/>
   <Button variant="outlined"><Link to='/home' className="createLink">Create</Link></Button>
   <br/>
    </div>
    </div>);
}