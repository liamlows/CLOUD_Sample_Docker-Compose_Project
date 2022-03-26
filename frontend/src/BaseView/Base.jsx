import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";

export const Base = () => {
    return <section className="baseView">
        <h1 className="mb-4">Welcome</h1>
        <h2 className="">This is the base page to be updated with logo and stuff</h2>
        <GenericButton  label="Login" click="/login" variant="contained" color="success"/>
    </section>
}
