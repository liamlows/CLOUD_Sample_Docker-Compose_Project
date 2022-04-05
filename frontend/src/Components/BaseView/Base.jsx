import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HomeView } from "../LoggedIn/HomeView";
import BaseResponsiveAppBar from "../common/BaseResponsiveAppBar";

export const Base = ({ currUser, setCurrUser, basePages, loggedInPages, settings}) => {

    const navigate = useNavigate();

    //if logged in (will store across refreshes) - May want to use local storage instead of cookie creation
    useEffect(() => {
        if (Cookies.get("username")) {
            setCurrUser(Cookies.get("username"));
        }
        else {
            setCurrUser('');
        }
    }, [currUser]);

    return <section className="baseView">
        {currUser === '' && <div>
            <BaseResponsiveAppBar pages={basePages} signIn={navigate('/login')} signUp={navigate('/signUp')}/>
            <h1 className="mb-4">Welcome</h1>
            <h2 className="">This is the base page to be updated with logo and stuff</h2>
            <GenericButton label="Login" click="/login" variant="contained" color="success" />
        </div>}
        {currUser !== '' && <HomeView currUser={currUser} setCurrUser={x => setCurrUser(x)} pages={loggedInPages} settings={settings} />}
    </section>
}
