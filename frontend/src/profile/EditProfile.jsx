import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Avatar, TextField } from '@mui/material';
import { stringAvatar } from './Profile';

export const EditProfile = () => {
    return (<div className="container">

    <h4 className="editHead">Edit Profile</h4>

{/* add onClick to change profile picture when implementing functionality */}
    <Button variant="outlined" className="avatarButton">Change Avatar</Button>
    <br/> <br/>
    <Avatar sx={{ height: '10rem', width: '10rem', float: 'right'}}/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Change Username"/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Change Name on Bio"/>
    <br/>
    <br/>
    {/* make this text area */}
    <TextField id="outlined-multiline-flexible" fullWidth multiline label="Change Bio"/>
   <br/> <br/>
   <Button variant="outlined"><Link to='/changePw' className="createLink">Change Password</Link></Button>
   <br/>
   <br/>

    <Stack direction="row" spacing = {2}>
        <Button variant="outlined"><Link to='/profile' className="createLink">Cancel</Link></Button>
        <Button variant="outlined"><Link to='/profile' className="createLink">Save</Link></Button>
    </Stack>
    </div>);
}