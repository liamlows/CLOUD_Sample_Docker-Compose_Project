import { accordionActionsClasses, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react"
import { findDOMNode } from "react-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { getAccountbyUsername, getFriendRequests, getProfiles, handleFriendRequest, logout, sendFriendRequest } from "../../APIFolder/loginApi"
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Add from "@mui/icons-material/Add";
import Cookies from "js-cookie";


export const UserSearch = ({ currUser, setCurrUser, pages, settings, setNavigated }) => {

    const navigate = useNavigate();

    const [profiles, setProfiles] = useState([]);

    const [username, setUsername] = useState('');
    const [dummy, setDummy] = useState(0);


    const goToProfile = profile => {

        navigate(`/users/${profile.username}`);
    }

    const goToFriendsList = () => {
        navigate(`/users/${currUser.username}/friends`);
    }

    useEffect(() => {
        console.log("running");
        // setProfiles(false);
        let dummy = [];
        console.log("INITIAL TYPE", typeof(dummy));
        getProfiles().then(response => {
        console.log("Getting requests")
        setProfiles(response);
            getFriendRequests().then(FRresponse => {
                let friendRequests = [...FRresponse.incoming, ...FRresponse.outgoing];
                // console.log(friendRequests);
                let status = [];
                for (const profile in response) {
                    // if(response[profile].account_id === currUser.account_id){continue;}
                    // console.log(response[profile])
                    status[profile] = 0; //auto value, aka display add friend button
                    for (const request in friendRequests) {
                        if (friendRequests[request].requester_id === response[profile].account_id 
                            || friendRequests[request].requested_id === response[profile].account_id) {

                            if (friendRequests[request].requester_id === currUser.account_id 
                                && (friendRequests[request].status === -1 
                                || friendRequests[request].status === 0)) {

                                status[profile] = 1; //display disabled button
                            }
                            else if (friendRequests[request].requested_id === currUser.account_id 
                                && friendRequests[request].status === -1) {

                                status[profile] = 2; //display accept request button
                            }
                            else if (friendRequests[request].status === 1) {

                                status[profile]= 3; //display friend tag
                            }
                        }  
                    }
                }
                addStatusToProfiles(response,status);
            }
            );
        });
    }, [dummy]);

    if (!currUser) {
        let username = Cookies.get("username");
        if (username) {
            getAccountbyUsername(username)
                .then(account => {
                    if (account) {
                        setCurrUser(account);
                    }
                    else {
                        console.log("User is null after request");
                        setCurrUser('');
                    }
                });
        }
        else {
            setCurrUser('');
            setNavigated(true);
            navigate('/');
        }
    }


    const addStatusToProfiles = (dummy,statuses) => {
        console.log("Adding status to profile")
        let profiles2 = [];
        for(const profile in dummy)
        {
            profiles2.push({...dummy[profile], status: statuses[profile]});
        }
        setProfiles(profiles2);


    }


    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            navigate('/');
            setCurrUser('');
        });
    }
    const profileNav = () => {
        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${currUser.username}`);
    }

    const displayUser = (profile) => {
        
        if(profile.status == 3)
        {
            console.log("already friends");
            return false;
        }
        if(profile.account_id === currUser.account_id){
            return false;
        }
        return true;

    }
    if (profiles.length === 0) {
        return <>Loading...</>
    }
    else{

    return <div>
        <LoggedInResponsiveAppBar
            pages={pages}
            settings={settings}
            signOut={() => signOut()}
            username={currUser.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

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
                {console.log("RENDER",typeof(profiles))}
                {profiles.map((profile,idx) => { 
                    return (displayUser(profile) && <tr key={idx} className="container">

                    <td>{profile.username}</td>
                    <td>{profile.first_name}</td>
                    <td>{profile.last_name}</td>
                    <td className="ts-2">0</td>
                    {/* <td>
                        <Button variant="contained"
                            className="btn btn-secondary"
                            onClick={() => sendFriendRequest(profile.id)}>
                            Add Friend
                        </Button>
                    </td> */}


                    {profile.status === 2 && <td className="col-1 pb-2">
                        <Button variant="contained" className="primary" onClick={() => {handleFriendRequest(profile.account_id, 1);setDummy(dummy+1)}} endIcon={<Add />}>Accept Request</Button>
                    </td>}
                    {profile.status === 1 && <td className="col-1 pb-2">
                        <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Add Friend </Button>
                    </td>}
                    {profile.status === 0 && <td className="col-1 pb-2">
                        <Button variant="contained" className="bg-success" onClick={() => {sendFriendRequest(profile.account_id);setDummy(dummy+1)}} endIcon={<Add />}>Add Friend </Button>
                    </td>}

                    {/* Need to add functionality to disable this if already friends ^ */}

                    <td>
                        <Button variant="contained"
                            className="btn btn-secondary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => goToProfile(profile)}>
                            View Profile
                        </Button>
                    </td>

                </tr>)
            })}
            </tbody>
        </table>
    </div>

}}