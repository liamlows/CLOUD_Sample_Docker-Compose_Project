import { getEmailbyUsername, getFirstNamebyUsername, getLastNamebyUsername, updateAccount} from "../APIFolder/loginApi";
import { TextField } from "../common";
import { useState } from "react";
import Cookies from "js-cookie";

export const Profile = () => {

    const lookingAtUser = "wes"
    let editMode = false;

    const [firstName, setFirstName] = useState(getFirstNamebyUsername(username));
    const [lastName, setLastName] = useState(getLastNamebyUsername(username));
    const [email, setEmail] = useState(getEmailbyUsername(username));
    const username = Cookies.get("username");

    const doneEditing = () => {
        editMode = false;
        updateAccount({"username": username,"firstName": firstName, "lastName": lastName, "email": email});
    }
    return <h1>Wes's Profile</h1>
    // Basically checks if the user is able to edit the 
    if(username === lookingAtUser){//Need to get LookingAtUser from somewhere, probably button click to get into profile
        if(editMode)
        {
            
            return <section className="userProfile">
                <h1>{lookingAtUser}'s Profile</h1>
                <TextField label="First Name :" value={firstName} setValue={setFirstName} />
                <TextField label="Last Name :" value={lastName} setValue={setLastName}/>
                <TextField label="Email :" value={email} setValue={setEmail} />
                <button onClick={doneEditing()}>Save</button>
            </section>
        }
        else{

            return <section className="userProfile">
                <h1>{lookingAtUser}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{firstName}</p>
                <h2>Last Name :</h2>
                <p>{lastName}</p>
                <h2>Email :</h2>
                <p>{email}</p>

                <button onClick={editMode = true}>Edit Profile</button>
            </section>
        }
    }
    else
    {
        return <section className="userProfile">
                <h1>{lookingAtUser}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{firstName}</p>
                <h2>Last Name :</h2>
                <p>{lastName}</p>
                <h2>Email :</h2>
                <p>{email}</p>
            </section>
    }


}
