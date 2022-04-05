//This is for when users first log in.

import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ResponsiveAppBar from "./ResponsiveAppBar";
import Cookies from "js-cookie";

export const HomeView = () => {

    const navigate = useNavigate();
    
    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    return <div>
        <ResponsiveAppBar pages={pages} settings={settings}></ResponsiveAppBar>
        <h1 className="mb-4">Welcome {Cookies.get("username")}</h1>
        <h2 className="">Mega Yuh</h2>
        <Link className="btn btn-secondary col-1" to='/'>
            Sign Out
        </Link>
        <button type="button" onClick={() => {
            Cookies.remove("username");
            Cookies.remove("connect.sid");
            console.log(Cookies.get());
            navigate('/');
        }}>Sign Out</button>
    </div>
}
