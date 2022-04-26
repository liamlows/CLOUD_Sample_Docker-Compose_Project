import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import React from "react";
import {baseEndpoint} from '../urls/API'
import { login } from "../api/UsersAPI";

export const LoginPage = () => {
    const formRef = React.useRef();
    let navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    // const checkAccount = () =>{
    //     axios.post(baseEndpoint+'/session',{email:email, password:password})
    //             .then(function(response){
    //                 if(response.status===201){
    //                     window.alert("Successfully logged in!");
    //                     localStorage.token=response.data.token;
    //                     <Link to='/home' className="createLink">Submit</Link>
    //                 }
    //                 else{
    //                     window.alert("Logged with error");
    //                 }
    //             })
    //             .catch(function(error){
    //                 window.alert(error);
    //         });
    // }
    const handleChangeEmail=(e)=>{
        setEmail(e.target.value)
    }

    const handleChangePW=(e)=>{
        setPassword(e.target.value)
    }
    
    
    const handleSubmitClick=()=>{
        //checkAccount();
        login(email, password);
        formRef.current.reportValidity();
        navigate(`/home`);
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
   <Button variant="outlined" onClick={handleSubmitClick}>Submit</Button>

   <br/>
   <br/>
        <h6><Link to='/create' className="createLink">Don't have an account? Click here to make one!</Link></h6>
   </div>
    </div>);
}

// import { Button } from "@material-ui/core";
// import { TextField } from "@mui/material";
// import './login.css';
// import { Link } from 'react-router-dom';

// export const LoginPage = () => {
//     return(<div className='Login-component'>
//     <div className="whiteBox">
//     <h1>Log In</h1>
//     <br/>
//     <TextField helperText="Please enter your username" id="demo-helper-text-misaligned" label="Username"/>
//     <br/>
//     <br/>
//     <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" label="Password"/>
//    <br/> <br/> <br/>
//    <Button variant="outlined"><Link to='/home' className="createLink">Submit</Link></Button>
//    <br/>
//    <br/>
//         <h6><Link to='/create' className="createLink">Don't have an account? Click here to make one!</Link></h6>
//    </div>
//     </div>);
// }