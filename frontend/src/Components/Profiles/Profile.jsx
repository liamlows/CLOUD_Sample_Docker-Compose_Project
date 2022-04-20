// Libary Imports
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from '@mui/icons-material/Clear';

// Component Imports
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


// Method Imports
import { getFriendRequests, getStatusByUsername, getAccountbyUsername, handleFriendRequest, logout, sendFriendRequest, updateAccountbyUsername, getFriendRequest, getFriendsClasses } from "../../APIFolder/loginApi";

export const Profile = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    const location = useLocation();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [online, setOnline] = useState(false);
    const [reload, setReload] = useState(false);
    const [classes, setClasses] = useState([]);

    // Initial Load
    useEffect(() => {
        let status = 0;

        if (localStorage.getItem("currUser") === "{}") {
            window.alert("Please log in to view profiles");
            navigate('/');
        }
        else {
            if (JSON.stringify(account) === "{}")
                setAccount(JSON.parse(localStorage.getItem("currUser")));

            getStatusByUsername(location.pathname.substring(7, location.pathname.length)).then((status) => setOnline(!!status.logged_in));

            getAccountbyUsername(location.pathname.substring(7, location.pathname.length)).then(loaded => {
                // get the table of friend requests
                getFriendRequest(loaded.account_id).then(res => {
                    // convert it to an array
                    if (res.requester_id === loaded.account_id) {
                        // if the friend request has not been accepted
                        if (res.status === -1) {
                            status = 2; // display accept request button
                            console.log("changing status to a 2", status);
                        }
                        // if the request has been accepted
                        else if (res.status === 1) {
                            status = 3; // display friend tag
                            console.log("changing status to a 3", status);
                        }
                        else if (res.status === 0) {
                            status = 4;
                            console.log("changing status to a 4", status);
                        }
                    }
                    // check if the request is from the user
                    else if (res.requested_id === loaded.account_id) {
                        // if the request has not been accepted
                        if (res.status === -1) {
                            status = 1; // display disabled button
                            console.log("changing status to a 1", status);
                        }
                        // if the request has been accepted
                        else if (res.status === 1) {
                            status = 3; // display friend tag
                            console.log("changing status to a 3", status);
                        }
                        else if (res.status === 0) {
                            status = 4;
                            console.log("changing status to a 4", status);
                        }
                    }
                }).catch(code => {
                    if (code === 404) {
                        status = 0;
                    }

                }).then(() => {
                    if (account.account_id !== JSON.parse(localStorage.getItem("currUser")).account_id) {
                        console.log(status, loaded);
                        if (account.status !== status) {
                            console.log("Adding status to account");
                            setAccount({ ...loaded, status: status });
                            console.log(account);
                        }
                    }
                }).then(() => {
                    if (status === 3) {
                        getFriendsClasses().then(res => {
                            setClasses(...res);
                        })
                    }
                });
            })
        }
    }, [editMode, reload, account, location.pathname]);


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
            localStorage.setItem("currUser", "{}")
            navigate('/');
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

    const handleFriendRequestFunc = (bool) => {
        console.log("handling");
        handleFriendRequest(account.account_id, bool)
        setReload(!reload)
    }

    const changeAccount = delta => setAccount({ ...account, ...delta });

    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    console.log("Account before if statement", account);
    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED
    if (JSON.stringify(account) !== "{}" && account.status !== undefined) {
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
                                        {account.status === 2 && <th className="col-2 pb-2">
                                            <Button variant="contained" className="bg-primary" onClick={() => { handleFriendRequestFunc(1) }} endIcon={<Add />}>Accept Request</Button>
                                            <Button variant="contained" className="bg-danger col-2" onClick={() => { handleFriendRequest(0) }}><ClearIcon /></Button>
                                        </th>}
                                        {account.status === 1 && <th className="col-2 pb-2">
                                            <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Request Sent</Button>
                                        </th>}
                                        {account.status === 4 && <th className="col-2 pb-2">
                                            <Button variant="contained" disabled endIcon={<ClearIcon color='disabled' />}>Redacted</Button>
                                        </th>}
                                        {account.status === 0 && <th className="col-2 pb-2">
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

            {classes.length !== 0 && <div>
                <h1>Classes</h1>
                <table>
                    <tbody>
                        {classes.map((clss, idx) => {

                            <tr key={clss.name} className="container">
                                
                            </tr>

                        })}
                    </tbody>
                </table>
            </div>}
        </section>
    }
    return <></>;
}