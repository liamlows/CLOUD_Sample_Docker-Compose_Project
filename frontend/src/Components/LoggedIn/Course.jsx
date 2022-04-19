import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React from "react";
import Button from "@mui/material/Button";
import {PopperButton} from "./common/PopperButton"

{/* TODO: path to each profile unqiue to each user**/}
export const CourseProfile = ({course}) => {
    //TODO: Navbar

    //course.num_seats
    var seats = ' / ${course.maxSeats}';
    return <section id="profile">
        <h1>{course.className}</h1>
        <p>{course.description}</p>
        <p onclick={()=>navigate(`/users/${course.professor}`)}>{course.professor}</p> 
        <p>{course.time}</p>
        <p>{course.average}</p>
         {/* TODO:  make badge for seats, maybe a popper that says that more seats may be added?  <p>{course.num_seats}/{course.maxSeats}</p>*/}
         <PopperButton 
             buttonText= {seats}
             content='More seats may be added in the future'
        /> 

        {/* TODO:  <p>{course.fufillments}</p>*/}
        {/* TODO:  add button to add to schedule, maybe add div for the link?
            add wait list notification, success, etc. 
        */}
        <GenericButton label= "Add Course to Schedule"/>

    </section>
}
