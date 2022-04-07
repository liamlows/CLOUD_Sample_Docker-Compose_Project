import { accordionActionsClasses } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react"
import { findDOMNode } from "react-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfiles } from "../../APIFolder/loginApi"
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


export const UserSearch = ({ currUser, setCurrUser, setLoadedUser, }) => {

    const navigate = useNavigate();
    // const [allProfiles, setProfiles] = useState(undefined);
    const [profiles, setProfiles] = useState(undefined);

    const [username, setUsername] = useState('');

    const goToProfile = profile => {
        setLoadedUser(profile);
        navigate(`/users/${profile.username}`);
    }

    const goToFriendsList = () => {
        navigate(`/users/${currUser.username}/friends`);
    }

    useEffect(() => {}, [username]);

    const find = profile => {
        let x = profile.username
        // console.log(typeof(x))
        if(x.search(username) !==-1){return true;}
        else{return false;}

        
        // console.log(x.search(username));
    }

    if (!profiles) {
        getProfiles().then(response => setProfiles(response) && console.log("recieved users info"));
        return <>Loading...</>
    }

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
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody>
                {profiles && profiles.map(profile => find(profile) && <tr key={profile.username} className="container">
                    
                    <td>{profile.username}</td>
                    <td>{profile.firstName}</td>
                    <td>{profile.lastName}</td>
                    <td className="ts-2">0</td>
                    <td><button type="button" className="btn btn-secondary" onClick={profile => goToProfile(profile)}>View Profile</button></td>
                </tr>)}
            </tbody>
        </table>
    </div>

}