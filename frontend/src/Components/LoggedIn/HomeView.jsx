//This is for when users first log in.

import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { LoggedInResponsiveAppBar } from "../common/LoggedInResponsiveAppBar";
import Cookies from "js-cookie";
import { useState } from "react";
import { getAccountbyUsername, logout } from "../../APIFolder/loginApi";
import { useEffect } from "react";
import {ClassMenu} from "./classMenu"

export const HomeView = ({ currUser, setCurrUser, pages, settings}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (currUser === '') {
            navigate('/');
        }
    }, [currUser]);

    const signOut = () => {
        logout().then(() =>setCurrUser(''));
    }
    const profileNav = () => {

        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {

        navigate(`accounts/${currUser.username}`);
    }

    return <div>
        <LoggedInResponsiveAppBar 
            pages={pages} 
            settings={settings} 
            signOut={() => signOut()} 
            username={currUser.username} 
            profileNav={() => profileNav()} 
            account={() => accountNav()} />
        <div className="col-6 p-0"><div className="col-1 p-0"></div><h1 className="col-6 mt-4 fs-2">Welcome {currUser.firstName}</h1></div>
        <div className="clearfix p-0"></div>
        <div className="row mt-5 m-3">
            <div className="col-6 border p-5">
                Add Classes Here
            </div>
            <div className="col-6 border p-5">
                Add Notifications Here
            </div>
        </div>
    </div>
}
