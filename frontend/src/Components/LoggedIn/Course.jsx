import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";

{/* TODO: path to each profile unqiue to each user**/}
export const CourseProfile = ({course}) => {
    //TODO: Navbar

    return <section id="profile">
        
        <h1>{course.className}</h1>
        <p>{course.description}</p>
        <p onclick={()=>navigate(`/users/${course.professor}`)}>{course.professor}</p> 
        <p>{course.time}</p>
        <p>{course.average}</p>
         {/* TODO:  make badge for seats*/}
        <p>{course.seatsTaken}/{course.maxSeats}</p>
        <h3>Waitlist: </h3>
        {/* TODO:  <p>{course.fufillments}</p>*/}
        {/* TODO:  add button to add to schedule, maybe add div for the link?*/}

    </section>
}
