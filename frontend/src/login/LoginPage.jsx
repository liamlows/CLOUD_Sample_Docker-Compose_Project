import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import './login.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return(<div className='Login-component'>
    <div className="whiteBox">
    <h1>Log In</h1>
    <br/>
    <TextField helperText="Please enter your username" id="demo-helper-text-misaligned" label="Username"/>
    <br/>
    <br/>
    <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" label="Password"/>
   <br/> <br/> <br/>
   <Button variant="outlined"><Link to='/home' className="createLink">Submit</Link></Button>
   <br/>
   <br/>
        <h6><Link to='/create' className="createLink">Don't have an account? Click here to make one!</Link></h6>
   </div>
    </div>);
}