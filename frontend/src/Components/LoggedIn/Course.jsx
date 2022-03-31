import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";

{/* TODO: path to each profile unqiue to each user**/}
export const Profile = () => {
    return <section id="profile">
        <GenericButton label="Classes" click="/loggedIn" />
        <GenericButton label="Sign Out" click="/" />
        <GenericButton label="Profile" click="/profile" />
        {/* TODO:  add actual stuff from table*/}
        <h1>Course Name</h1>
        <p>Course Description</p>
        <p>Professor</p>
        <p>Time</p>
        <p>Average</p>
        {/* TODO:  add button to add to schedule*/}

    </section>
}
