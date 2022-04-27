import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import './login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { checkAccount } from "../api/AuthenAPI";

export const LoginPage = () => {
    const navigate = useNavigate();

    localStorage.clear();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const handleChangeEmail=(e)=>{
        setEmail(e.target.value);
    }

    const handleChangePW=(e)=>{
        setPassword(e.target.value);
    }
    
    const handleSubmitClick=()=>{
        checkAccount(email,password);
        //login(email, password);
        navigate('/home');
    }

    return(<div className='Login-component'>
    <div className="whiteBox">
    <h1>Log In</h1>
    <br/>
    <TextField required helperText="Please enter your Email" id="demo-helper-text-misaligned" label="Email"
        value={email} onChange={handleChangeEmail}/>
    <br/>
    <br/>
    <TextField required helperText="Please enter your password" id="demo-helper-text-misaligned" label="Password"
        type='password' value={password} onChange={handleChangePW}/>

   <br/> <br/> <br/>
   <Button variant="outlined" onClick={handleSubmitClick}><Link to='./home' className="createLink">Submit</Link></Button>

   <br/>
   <br/>
        <h6><Link to='/create' className="createLink">Don't have an account? Click here to make one!</Link></h6>
   </div>
    </div>);
}