import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Avatar, TextField } from '@mui/material';
import { stringAvatar } from './Profile';
import{ useState,useEffect } from 'react';
import { updateUserById } from '../api/AuthenAPI';
import {useParams } from 'react-router-dom';

export const EditProfile = () => {
    // const[user,setUser]=useState(undefined);
    const params=useParams();
    const [username, setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submit,setSubmitted]=useState(false);
    const [error, setError] = useState(false);
    
    // useEffect(()=>{
    //     getUserInfo().then(x => setUser(x));
    // },[ ]);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
      };

      // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
      };
     
      // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
      };
     
      // Handling the form submission
    const handleSubmit = () => {
        //e.preventDefault();
        if (username === '' || email === '' || password === '') {
          setError(true);
          window.alert("Fail to Change!");
        } else {
            if(params.id){
            setSubmitted(true);
            setError(false);
            updateUserById(username, email, password);
            }
        }
    };
    

    return (<div className="profileContainer">

    <h4 className="editHead">Edit Profile</h4>

{/* add onClick to change profile picture when implementing functionality */}
    {/* <Button variant="outlined" className="avatarButton">Change Avatar</Button> */}
    <br/> <br/>
    <Avatar sx={{ height: '10rem', width: '10rem', float: 'right'}}/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Change Username" value={username} onChange={handleUsername}/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Change Email" value={email} onChange={handleEmail}/>
    <br/>
    <br/>
    <br/>
    <TextField id="demo-helper-text-misaligned" label="Change Password" type='password' value={password} onChange={handlePassword}/>
    <br/>
    {/* make this text area */}
    {/* <TextField id="outlined-multiline-flexible" fullWidth multiline label="Change Bio"/> */}
   <br/> <br/>
   {/* <Button variant="outlined"><Link to='/changePw' className="createLink">Change Password</Link></Button>
   <br/>
   <br/> */}

    <Stack direction="row" spacing = {2}>
        <Button variant="outlined"><Link to='/profile' className="createLink">Cancel</Link></Button>
        <Button variant="outlined" onClick={handleSubmit}><Link to='/' className="createLink">Save</Link></Button>
    </Stack>
    </div>);
}