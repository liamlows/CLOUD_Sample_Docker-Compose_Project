//This is for when users first log in.

import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { LoggedInResponsiveAppBar } from "../common/LoggedInResponsiveAppBar";
import Cookies from "js-cookie";
import { useState } from "react";
import { getAccountbyUsername } from "../../APIFolder/loginApi";
import { useEffect } from "react";

export const HomeView = ({ currUser, setCurrUser, pages, settings}) => {

    const navigate = useNavigate();

    const [account, setAccount] = useState(undefined);

    useEffect(() => {
        if (currUser == '') {
            navigate('/');
        }
    }, [currUser]);

    if (!account) {
        setAccount(currUser);
        // getAccountbyUsername(currUser).then(x => setAccount(x));
    }

    const signOut = () => {
        Cookies.remove("username");
        Cookies.remove("connect.sid");
        // console.log(Cookies.get());
        setCurrUser('');
    }

    return <div>
        <LoggedInResponsiveAppBar pages={pages} settings={settings} signOut={signOut()}></LoggedInResponsiveAppBar>
        {/* <h1 className="mb-4">Welcome {account.firstName}</h1> */}
    </div>
}
