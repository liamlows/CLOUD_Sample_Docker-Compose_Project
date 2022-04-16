// Libary Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Component Imports
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";

// Method Imports
import { getFriendRequests, getStatusByUsername, getAccountbyUsername, handleFriendRequest, logout, sendFriendRequest, updateAccountbyUsername } from "../../APIFolder/loginApi";

export const Profile = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("currUser")));
    const [editMode, setEditMode] = useState(false);
    const [online, setOnline] = useState(false);
    const [reload, setReload] = useState(false);

    // Initial Load
    useEffect(() => {
        let status = 0;

        if (account === {}) {
            window.alert("Please log in to view profiles");
            navigate('/');
            props.setNavigated(true);
        }
        else {
            getStatusByUsername(account.username).then(status => setOnline(!!status.logged_in));
            
            // get the table of friend requests
            getFriendRequests().then(res => {
                // convert it to an array
                let frReq = [...res.incoming, ...res.outgoing];

                // loop through each request
                for (const req in frReq) {
                    // check if the request is to the current user
                    if (frReq[req].requester_id === account.account_id) {
                        // if the friend request has not been accepted
                        if (frReq[req].status === -1 || frReq[req].status === 0) {
                            status = 2; // display accept request button
                            console.log("changing status to a 2", status);
                        }
                        // if the request has been accepted
                        else if (frReq[req].status === 1) {
                            status = 3; // display friend tag
                            console.log("changing status to a 3", status);
                        }
                    }
                    // check if the request is from the user
                    else if (frReq[req].requested_id === account.account_id) {
                        // if the request has not been accepted
                        if (frReq[req].status === -1 || frReq[req].status === 0) {
                            status = 1; // display disabled button
                            console.log("changing status to a 1", status);
                        }
                        // if the request has been accepted
                        else if (frReq[req].status === 1) {
                            status = 3; // display friend tag
                            console.log("changing status to a 3", status);
                        }
                    }
                }
            }).then(() => {
                console.log(status, account);
                addStatusToAccount(status);
            });
        }
    }, [editMode, reload, account]);

    // Conditions
    if (JSON.stringify(account) === "{}") {
        let username = Cookies.get("username");
        if (username) {
            getAccountbyUsername(username)
                .then(account => {
                    if (account) {
                        localStorage.setItem("currUser", JSON.stringify(account));
                        setAccount(account);
                    }
                    else {
                        console.log("User is null after request");
                    }
                });
        }
        else {
            props.setNavigated(true);
            navigate('/');
        }
    }

    // Component Methods
    const addStatusToAccount = (status) => {
        console.log("Adding status to account");
        setAccount({ ...account, status: status });
        console.log(account);
    }

    const startEditing = () => {
        setEditMode(true);
        changeAccount({ ...account });
    }

    const doneEditing = () => {
        if (account.first_name && account.last_name) {
            updateAccountbyUsername(account).then(setEditMode(false));
            localStorage.setItem("currUser", JSON.stringify(account));
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
            localStorage.setItem("currUser", "{}")
        });
    }

    const profileNav = () => {
        navigate(`users/${account.username}`);
    }

    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    const sendFriendRequestFunc = () => {
        console.log("sending friend request");
        sendFriendRequest(account.account_id)
        setReload(!reload)
    }

    const handleFriendRequestFunc = () => {
        console.log("handling");
        handleFriendRequest(account.account_id, 1)
        setReload(!reload)
    }

    const changeAccount = delta => setAccount({ ...account, ...delta });


    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED
    if (account && account.status !== undefined) {
        return <section className="userProfile">
            <LoggedInResponsiveAppBar
                pages={props.pages}
                settings={props.settings}
                signOut={() => signOut()}
                username={account.username}
                profileNav={() => profileNav()}
                account={() => accountNav()} />

            {/* Viewing own profile (EDITING) */}
            {JSON.parse(localStorage.getItem("currUser")).username === account.username && editMode === true &&
                <div className="container border-0 mt-5">
                    <div className="row bg-light pb-4">
                        <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3 mt-5 pb-5" alt="" />
                        <div className="col-7 float-start mt-5">
                            <table className='table float-start'>
                                <thead>
                                    {online && <th className="float-start mt-3 mb-1"><CircleIcon color='success' /></th>}
                                    {online && <th className="float-start mt-3 mb-1"><CircleIcon sx={{ color: 'red' }} /></th>}
                                    <th className="float-start col-3 fs-3 mt-2 text-start"><span className="text-start p-0">{account.username}</span></th>

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
            {JSON.parse(localStorage.getItem("currUser")).username === account.username && editMode === false &&
                <div className="container border-0 mt-5">
                    <div className="row bg-light pb-4">
                        <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3 mt-5" alt="" />
                        <div className="col-7 float-start mt-5">
                            <table className='table float-start'>
                                <thead>
                                    {online === true && <th className="float-start mt-3 mb-1"><CircleIcon color='success' /></th>}
                                    {online === false && <th className="float-start mt-3 mb-1"><CircleIcon sx={{ color: 'red' }} /></th>}
                                    <th className="float-start col-3 fs-3 mt-2 text-start">{account.username}</th>
                                    <th className="col-1">
                                        <button type="button" className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                    </th>
                                </thead>
                                <tbody>
                                    <td className="col-3 fs-6 text-start">
                                        <span className="p-0 text-capitalize">{account.first_name} </span><span className="p-0 text-capitalize" >{account.last_name}</span>
                                    </td>
                                    {/* <h2>Email :</h2>
                            <p>{account.email}</p> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}

            {/* Viewing profile besides your own */}
            {JSON.parse(localStorage.getItem("currUser")).username !== account.username &&
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
                                        <th className="float-start col-3 fs-3 mt-2 text-start">{account.username}</th>
                                        {account.status === 2 && <th className="col-1 pb-2">
                                            <Button variant="contained" className="bg-primary" onClick={() => { handleFriendRequestFunc() }} endIcon={<Add />}>Accept Request</Button>
                                        </th>}
                                        {account.status === 1 && <th className="col-1 pb-2">
                                            <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Add Friend </Button>
                                        </th>}
                                        {account.status === 0 && <th className="col-1 pb-2">
                                            <Button variant="contained" className="bg-success" onClick={() => sendFriendRequestFunc()} endIcon={<Add />}>Add Friend </Button>
                                        </th>}
                                        {account.status === 3 &&
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
                                            <span className="p-0 text-capitalize">{account.first_name} </span><span className="p-0 text-capitalize" >{account.last_name}</span>
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
}