import { GenericButton } from "../common/GenericButton"
import ReactDOM from "react-dom";
import React, {useState} from "react";
import Button from "@mui/material/Button";

export const SignUpPage = () => {

    const [majorMinor, setMajorMinor] = useState('');
    const [ standing, setStanding ] = useState('');
    const [ standings ] = useState([
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "5+ Year",
    ]);

{/* TODO: path to each profile unqiue to each user**/}
export const Profile = () => {
    return <section id="profile">
        <GenericButton label="Cancel" click="/profile" />
        {/* TODO:  add actual stuff to table*/}
        <form className="container">
            <TextField label="Majors and Minors"
                       value={majorMinor}
                       setValue={x => setMajorMinor(x)} />

            <SelectField label="Standing"
                         options={standings}
                         value={standing}
                         setValue={setStanding} />
            <GenericButton label="Confirm" click="/profile" />
            {/* TODO:  add field to have old coursed be put into past courses table*/}
        </form>
    </section>
}
