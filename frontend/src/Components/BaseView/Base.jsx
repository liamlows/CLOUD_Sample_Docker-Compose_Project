// Library Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../../logo.jpg'

// Component Imports
import { HomeView } from "../LoggedIn/HomeView"
import { BaseResponsiveAppBar } from "../common/BaseResponsiveAppBar"
import ErrorSnackBar from "./ErrorSnackBar"

export const Base = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables

    // Initial Load
    useEffect(() => {
        console.log("Loading Base...");
    }, [props.account])

    // Conditions

    // Component Methods
    const onSignIn = () => {
        console.log("signing in");
        navigate('/login');
    }
    const onSignUp = () => {
        console.log("signing up");
        navigate('/signup');
    }

    // HTML
    return <section className="baseView">
        {props.navigated && <ErrorSnackBar></ErrorSnackBar>}
        {localStorage.getItem("currUser") === "{}" && <div>
            <BaseResponsiveAppBar 
                pages={props.basePages}
                signIn={() => onSignIn()}
                signUp={() => onSignUp()} />
            <h1 className="mb-4">Welcome to</h1>
           {/* <h2 className="">This is the base page to be updated with logo and stuff</h2>*/}
           <img src={logo} alt='Logo' className='img-thumbnail w-25 h-25 border-0'/>
           <h5 className="mt-2 text-muted">In a pickle trying to find your classes? Not anymore!</h5>
        </div>}
        {/*if the user is logged in*/}
        {localStorage.getItem("currUser") !== "{}" && <HomeView {...props} />}
    </section>
}
