import { updateAccountbyId, getAccountbyUsername } from "../../APIFolder/loginApi";
import { TextField } from "../common";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Profile = ({currUser, setCurrUser, loadedProfile}) => {

    const navigate = useNavigate();
    let editMode = false;

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState(loadedProfile)
    const username = Cookies.get("username");

    useEffect(() => {}, [editMode]);

    const startEditing = () => {
        editMode = true;
        // navigate(`users/${username}`) //dont think I need this since useEffect should update dom
    }
    const doneEditing = () => {
        // updateAccountbyId(account);
        setCurrUser(account);
        editMode = false;
        // navigate(`users/${username}`) //dont think I need this since useEffect should update dom
    }

    const changeFirstName = delta => setAccount({...account, ...delta});
    const changeLastName = delta => setAccount({...account, ...delta});
    const changeEmail = delta => setAccount({...account, ...delta});
    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED

    return <section className="userProfile">
        {account.username === loadedProfile && editMode && <div>
            <h1>{loadedProfile}'s Profile</h1>
            <TextField label="First Name :" value={account.firstName} setValue={x => changeFirstName(x)} />
            <TextField label="Last Name :" value={account.lastName} setValue={x => changeLastName(x)} />
            {/* <TextField label="Email :" value={account.email} setValue={x => changeEmail(x)} /> */}
            <button onClick={doneEditing()}>Save</button>
        </div>}
        {account.username === loadedProfile.username && !editMode && <div> <h1>{loadedProfile}'s Profile</h1>
            <h2>First Name :</h2>
            <p>{account.firstName}</p>
            <h2>Last Name :</h2>
            <p>{account.lastName}</p>
            {/* <h2>Email :</h2>
            <p>{account.email}</p> */}
            <button onClick={startEditing()}>Edit Profile</button>
        </div>}
        {account.username !== loadedProfile.username && <div>
            <h1>{loadedProfile.username}'s Profile</h1>
            <h2>First Name :</h2>
            <p>{loadedProfile.firstName}</p>
            <h2>Last Name :</h2>
            <p>{loadedProfile.lastName}</p>
            {/* <h2>Email :</h2>
            <p>{loadedProfile.email}</p> */}
        </div>}
    </section>
}