import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Base = ({ currUser, setCurrUser }) => {

    const navigate = useNavigate();

    //if logged in (will store across refreshes) - May want to use local storage instead of cookie creation

    useEffect(() => {
        if (Cookies.get("username")) {
            setCurrUser(Cookies.get("username"));
            navigate('/home');
        }
        else{
            setCurrUser('');
        }
    }, [currUser]);

    return <section className="baseView">
        <h1 className="mb-4">Welcome</h1>
        <h2 className="">This is the base page to be updated with logo and stuff</h2>
        <GenericButton label="Login" click="/login" variant="contained" color="success" />
    </section>
}
