import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";

{/* TODO: path to each profile unqiue to each user**/}
export const Profile = () => {
    return <section id="profileView">
        <GenericButton label="Classes" click="/loggedIn" />
        <GenericButton label="Sign Out" click="/" />
        <GenericButton label="Edit Profile" click="/profile_student_edit" />
        {/* TODO:  add actual stuff from table*/}
        <h1>User Name</h1>
        <p>Majors and Minors</p>
        <p>Standing (1st year, 2nd year, etc.)</p>
        <h3>My Schedule:</h3>
        {/* TODO:  add table*/}
        <h4>Classes I've taken</h4>
        {/* TODO: add hidden grade table?*/}
    </section>
}
