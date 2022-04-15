import { getAccountbyUsername, getFriendRequests, getStatusByUsername, handleFriendRequest, logout, sendFriendRequest, updateAccountbyUsername } from "../../APIFolder/loginApi";
import { TextField } from "../common";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import CircleIcon from '@mui/icons-material/Circle';
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const Profile = ({ currUser, setCurrUser, pages, settings, setNavigated }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState('');
    const [loadedProfile, setLoadedProfile] = useState('');
    
    const [friend, setFriend] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [recieveRequest, setRecieveRequest] = useState(false);

    const username = Cookies.get("username");
    const [online, setOnline] = useState(undefined);
    const [hasStatus, setHasStatus] = useState(false);

    const changeLoadedProfile = (delta) => { setLoadedProfile({ ...loadedProfile, ...delta }) }

    useEffect(() => {
        
        getAccountbyUsername(location.pathname.substring(7, location.pathname.length))
            .then(response => {
                // console.log("Response = ");
                // console.log(response);
                changeLoadedProfile({ ...response });
                // console.log(loadedProfile)

            })
        
    }, [editMode, sentRequest, friend, recieveRequest]);

    if (!loadedProfile) {
        // get the account from the username
        getStatusByUsername(username).then((status) => { setOnline(!!status.logged_in); console.log("online = "+online) })
        return <>Loading...</>
    }
    const startEditing = () => {
        changeAccount({ ...currUser });
        setEditMode(true);
    }
    const doneEditing = () => {

        if (account.first_name && account.last_name) {
            updateAccountbyUsername(account).then(setEditMode(false));
        }
        else {
            window.alert("Please fill out both fields");
        }
    }
    const cancel = () => {
        setEditMode(false);
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

    if(loadedProfile.account_id !== currUser.account_id && !hasStatus)
    {
        setHasStatus(true);
        console.log(hasStatus);
        getFriendRequests().then((response) => {
            let requests = [...response.incoming, ...response.outgoing];

            for (const request in requests) {
                if(requests[request].status === -1){console.log(loadedProfile.account_id,requests[request].requested_id, requests[request].requester_id)}
                if (requests[request].requester_id === loadedProfile.account_id || requests[request].requested_id === loadedProfile.account_id) {
                    if (requests[request].status === 1) { setFriend(1); break; }
                    if (requests[request].status === 0) { console.log("Not Friends"); setSentRequest(1); break; }
                    if (requests[request].requester_id === loadedProfile.account_id && requests[request].status === -1) { console.log("Already sent");setSentRequest(1); setRecieveRequest(0);console.log(recieveRequest,sentRequest); break; }
                    if (requests[request].requested_id === loadedProfile.account_id && requests[request].status === -1) { console.log("Recieved one");setSentRequest(0); setRecieveRequest(1);console.log(recieveRequest,sentRequest); break; }
                }
            }
        })
    }

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

    const sendFriendRequestFunc = () => {
        console.log("sending friend request");
        sendFriendRequest(loadedProfile.id).then(() => {setHasStatus(false)})
    }

    const handleFriendRequestFunc = () => {
        console.log("handling");
        handleFriendRequest(loadedProfile.id, 1).then(() => {setHasStatus(false)})
    }

    const changeAccount = delta => setAccount({ ...account, ...delta });

    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED

    return <section className="userProfile">
        <LoggedInResponsiveAppBar
            pages={pages}
            settings={settings}
            signOut={() => signOut()}
            username={currUser.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

        {/* Viewing own profile (EDITING) */}
        {currUser.username === loadedProfile.username && editMode === true &&
            <div className="container border-0 mt-5">
                <div className="row bg-light pb-4">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3 mt-5 pb-5" alt="" />
                    <div className="col-7 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                {online&& <th className="float-start mt-3 mb-1"><CircleIcon color='success' /></th>}
                                {online&& <th className="float-start mt-3 mb-1"><CircleIcon sx={{ color: 'red' }} /></th>}
                                <th className="float-start col-3 fs-3 mt-2 text-start"><span className="text-start p-0">{loadedProfile.username}</span></th>

                                <th className="col-1">
                                    <button type="button" className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">
                                        <TextField label="First Name :" value={account.first_name} setValue={first_name => changeAccount({ first_name })} />
                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">

                                        <TextField label="Last Name :" value={account.last_name} setValue={last_name => changeAccount({ last_name })} />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>
                                    <TextField label="Email :" value={account.email} setValue={x => changeEmail(x)} />
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <button type="button" className="btn btn-secondary col-4 contained m-1 float-end" onClick={() => cancel()}>Cancel</button>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-success col-4 contained m-1 float-start" onClick={() => doneEditing()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>}

        {/* Viewing own profile (NOT EDITING) */}
        {currUser.username === loadedProfile.username && editMode === false &&
            <div className="container border-0 mt-5">
                <div className="row bg-light pb-4">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3 mt-5" alt="" />
                    <div className="col-7 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                {online === true && <th className="float-start mt-3 mb-1"><CircleIcon color='success' /></th>}
                                {online === false && <th className="float-start mt-3 mb-1"><CircleIcon sx={{ color: 'red' }} /></th>}
                                <th className="float-start col-3 fs-3 mt-2 text-start">{loadedProfile.username}</th>
                                <th className="col-1">
                                    <button type="button" className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{loadedProfile.first_name} </span><span className="p-0 text-capitalize" >{loadedProfile.last_name}</span>
                                </td>
                                {/* <h2>Email :</h2>
                            <p>{account.email}</p> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}

        {/* Viewing profile besides your own */}
        {currUser.username !== loadedProfile.username &&
            <div>
                <div className="row">
                    <div className="col-3 float-end">
                        <Button variant="contained" className="m-3" onClick={() => navigate('/users')} startIcon={<KeyboardBackspaceIcon />}>Return to Search</Button>
                    </div>
                </div>
                <div className="clearfix p-0"></div>
                <div className="container border-0 mt-3">
                    <div className="row bg-light pb-4">
                        <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3 mt-5" alt="" />
                        <div className="col-7 float-start mt-5">
                            <table className='table float-start'>
                                <thead>
                                {online === true && <th className="float-start mt-3 mb-1"><CircleIcon color='success' /></th>}
                                {online === false && <th className="float-start mt-3 mb-1"><CircleIcon sx={{ color: 'red' }} /></th>}
                                    <th className="float-start col-3 fs-3 mt-2 text-start">{loadedProfile.username}</th>
                                    {!friend && recieveRequest===1 && <th className="col-1 pb-2">
                                        <Button variant="contained" className="primary" onClick={() => {handleFriendRequestFunc()}} endIcon={<Add />}>Accept Request</Button>
                                    </th>}
                                    {!friend && sentRequest===1 && <th className="col-1 pb-2">
                                        <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Add Friend </Button>
                                    </th>}
                                    {!friend && sentRequest===0 && recieveRequest !== 1 && <th className="col-1 pb-2">
                                        <Button variant="contained" className="bg-success" onClick={() => sendFriendRequestFunc()} endIcon={<Add />}>Add Friend </Button>
                                    </th>}
                                    {friend &&
                                        <div className="float-end col-2 mb-1 mt-2">
                                            <div className="clearfix p-0"></div>
                                            <th className="col-1 rounded bg-success border-0 p-1">
                                                <div className="bg-success text-white">
                                                    Friends <Check className='mb-1 m-1 mt-0' />
                                                </div>
                                            </th>
                                        </div>
                                    }

                                </thead>
                                <tbody>
                                    <td className="col-3 fs-6 text-start">
                                        <span className="p-0 text-capitalize">{loadedProfile.first_name} </span><span className="p-0 text-capitalize" >{loadedProfile.last_name}</span>
                                    </td>
                                    {/* <h2>Email :</h2>
                        <p>{account.email}</p> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
    </section>
}