import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Base = () => {

    const navigate = useNavigate();

    if(Cookies.get("username"))
    {
        return <section className="baseView">
        <h1 className="mb-4">Welcome {Cookies.get("username")}</h1>
        <h2 className="">Mega Yuh</h2>
        <GenericButton label="Wes" click="/wes" />
        <button type="button" onClick={() => {
            Cookies.remove("username");
            navigate('/');
    }}>Sign Out</button>
    
    </section>
    }


    return <section className="baseView">
        <h1 className="mb-4">Welcome</h1>
        <h2 className="">This is the base page to be updated with logo and stuff</h2>
        <GenericButton  label="Login" click="/login" variant="contained" color="success"/>
    </section>
}
