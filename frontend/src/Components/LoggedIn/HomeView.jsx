//This is for when users first log in.

import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ResponsiveAppBar from "./ResponsiveAppBar";
import Cookies from "js-cookie";
import { useState } from "react";
import { getAccountbyUsername } from "../../APIFolder/loginApi";

export const HomeView = (props) => {

    const navigate = useNavigate();

    const [ account, setAccount ] = useState(undefined);

    if(!account){
        getAccountbyUsername(props.username).then(x => setAccount(x));
    }

    const signOut = () => {
        Cookies.remove("username");
        Cookies.remove("connect.sid");
        console.log(Cookies.get());
        navigate('/');
    }

    const [pages] = useState(['Classes']);
    const [settings] = useState([
        // {label: 'Public Profile', route: `/users/${account.id}` }, Keep out until have an account id confirmed
        // { label: 'Account', route: `/accounts/${account.id}` }, 
        {label: 'Public Profile', route: `/users` }, 
        { label: 'Account', route: `/accounts` }, 
        { label: 'Dashboard', route: '/home' },
        // { label: 'Logout', onclick: 'signOut()'}
    ]);

    return <div>
        <ResponsiveAppBar pages={pages} settings={settings}></ResponsiveAppBar>
        <h1 className="mb-4">Welcome {props.username}</h1>
    </div>
}
