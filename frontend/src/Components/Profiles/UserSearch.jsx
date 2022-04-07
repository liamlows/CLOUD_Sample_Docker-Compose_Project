import { accordionActionsClasses } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { getProfiles } from "../../APIFolder/loginApi"
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


export const UserSearch = ({ currUser, setCurrUser, setLoadedUser, }) => {

    const navigate = useNavigate();
    const [profiles, setProfiles] = useState(undefined);

    const [username, setUsername] = useState(undefined);

    const goToProfile = profile => {
        setLoadedUser(profile);
        navigate(`/users/${profile.username}`);
    }

    const goToFriendsList = () => {
        navigate(`/users/${currUser.username}/friends`);
    }

    useEffect(() => {
        getProfiles().then(response => { setProfiles(response) }).then(console.log("recieved users info"));
    }, []);

    // if (!accounts) {
    //     getProfiles().then(response => { setProfiles(response) })
    //     return <>Loading...</>
    // }

    return <div>
        {/* <LoggedInResponsiveAppBar/> To implement */}
        <div className="container border-0 mt-3">
            <button type="button" className="float-end btn btn-success mt-3" onClick={goToFriendsList}>Friends List</button>
            <div className="container border-0 col-3 float-start">
                <TextField label="Search by Username" value={username} setValue={setUsername} />
            </div>
            <div className="clearfix"></div>
        </div>

        {/* TODO: Want to implement virtulized table eventually but regular table for now */}
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Friend Count</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {profiles && profiles.map(profile => <tr className="container">
                    <td>{profile.username}</td>
                    <td>{profile.firstName}</td>
                    <td>{profile.lastName}</td>
                    <td className="ts-2">0</td>
                    <td><button type="button" className="btn btn-secondary" onClick={profile => console.log(profile) && goToProfile(profile)}>View Profile</button></td>
                </tr>)}
            </tbody>
        </table>
    </div>

}