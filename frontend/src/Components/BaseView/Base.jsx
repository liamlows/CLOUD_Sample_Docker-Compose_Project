import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HomeView } from "../LoggedIn/HomeView";
import BaseResponsiveAppBar from "../common/BaseResponsiveAppBar";
import { getAccountbyUsername } from "../../APIFolder/loginApi";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";

export const Base = ({ currUser, setCurrUser, basePages, loggedInPages, settings, loadedProfile, setloadedProfile}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const onSignIn = () => {
        console.log("doing sign in");
        navigate('/login');
    }

    const onSignUp = () => {
        console.log("doing sign up");
        navigate('/signUp');
    }

    return <section className="baseView">
        {currUser === '' && <div>
            <BaseResponsiveAppBar pages={basePages}
                                  signIn={() => onSignIn()}
                                  signUp={() => onSignUp()} />
            <h1 className="mb-4">Welcome</h1>
            <h2 className="">This is the base page to be updated with logo and stuff</h2>
        </div>}
        {currUser !== '' && <HomeView currUser={currUser} setCurrUser={x => setCurrUser(x)} pages={loggedInPages} settings={settings} />}
    </section>
}
