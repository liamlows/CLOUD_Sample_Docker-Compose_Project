import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './profile.css'

export const ChangePassword = () => {
    return (<div className="container">
    <h4 className="editHead">Change Password</h4>
    <h6>
        Enter your username and email below to receive a unique link from which you can reset your password.
    </h6>
    <TextField id="demo-helper-text-misaligned" label="Username"/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Email"/>
    <br/>
    <br/>
    <Button variant="outlined" color="secondary" onClick={() => {alert('The email has been sent.');}}>Send Link</Button>
    <br/><br/>
   <Button variant="outlined"><Link to='/profile' className="createLink">Return to Profile</Link></Button>
   <br/>
   <br/>

    </div>);
}