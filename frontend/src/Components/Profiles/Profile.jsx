import { getEmailbyUsername, getFirstNamebyUsername, getLastNamebyUsername, updateAccount} from "../APIFolder/loginApi";
import { TextField } from "../common";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();
    const loadedUser = "wes"
    let editMode = false;

    //Doesn't currently know what info to get from the database
    const [firstName, setFirstName] = useState(getFirstNamebyUsername(username));
    const [lastName, setLastName] = useState(getLastNamebyUsername(username));
    const [email, setEmail] = useState(getEmailbyUsername(username));
    const username = Cookies.get("username");


    const startEditing = () => {
        editMode = true;
        navigate(`/${username}`)
    }
    const doneEditing = () => {
        editMode = false;
        updateAccount({"username": username,"firstName": firstName, "lastName": lastName, "email": email});
        navigate(`/${username}`)
    }


    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED

    if(username === loadedUser){//Need to get loadedUser from somewhere, probably button click to get into profile
        if(editMode)
        {
            
            return <section className="userProfile">
                <h1>{loadedUser}'s Profile</h1>
                <TextField label="First Name :" value={firstName} setValue={setFirstName} />
                <TextField label="Last Name :" value={lastName} setValue={setLastName}/>
                <TextField label="Email :" value={email} setValue={setEmail} />
                <button onClick={doneEditing()}>Save</button>
            </section>
        }
        else{

            return <section className="userProfile">
                <h1>{loadedUser}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{firstName}</p>
                <h2>Last Name :</h2>
                <p>{lastName}</p>
                <h2>Email :</h2>
                <p>{email}</p>
                <button onClick={startEditing()}>Edit Profile</button>
            </section>
        }
    }
    else
    {
        return <section className="userProfile">
                <h1>{loadedUser}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{firstName}</p>
                <h2>Last Name :</h2>
                <p>{lastName}</p>
                <h2>Email :</h2>
                <p>{email}</p>
            </section>
    }


}
