import { getAccountbyUsername, logout, updateAccountbyUsername } from "../../APIFolder/loginApi";
import { TextField } from "../common";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import CircleIcon from '@mui/icons-material/Circle';

export const Profile = ({ currUser, setCurrUser, pages, settings }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState('')
    const [loadedProfile, setLoadedProfile] = useState('')
    const [online, setOnline] = useState('')

    // const username = Cookies.get("username");

    useEffect(() => {
        getAccountbyUsername(location.pathname.substring(7, location.pathname.length)).then(response => setLoadedProfile(response))
    }, [editMode]);

    if (!loadedProfile) {
        // get the account from the username
        return <>Loading...</>
    }
    const startEditing = () => {
        changeAccount({...currUser});
        setEditMode(true);
    }
    const doneEditing = () => {
        
        if (account.firstName && account.lastName) {
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
        logout().then(() => setCurrUser(''));
    }
    const profileNav = () => {
        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${currUser.username}`);
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
            getStatusByUsername(username).then(status => setOnline(status));
        }
        else {
            setCurrUser('');
            window.alert("Please sign in to view profiles");
            navigate('/');
        }

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
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{loadedProfile.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                                <th className="col-1">
                                    <button className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">
                                        <TextField label="First Name :" value={account.firstName} setValue={firstName => changeAccount({firstName})} />
                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">

                                        <TextField label="Last Name :" value={account.lastName} setValue={lastName => changeAccount({lastName})} />
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
                            <button type="button" className="btn btn-secondary col-3 contained m-1 float-end" onClick={() => cancel()}>Cancel</button>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-success col-3 contained m-1 float-start" onClick={() => doneEditing()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>}

        {/* Viewing own profile (NOT EDITING) */}
        {currUser.username === loadedProfile.username && editMode === false &&
            <div className="container border-0 mt-5">
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{loadedProfile.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                                <th className="col-1">
                                    <button className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{loadedProfile.firstName} </span><span className="p-0 text-capitalize" >{loadedProfile.lastName}</span>
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
            <div className="container border-0 mt-5">
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{loadedProfile.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                            </thead>
                            <tbody>
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{loadedProfile.firstName} </span><span className="p-0 text-capitalize" >{loadedProfile.lastName}</span>
                                </td>
                                {/* <h2>Email :</h2>
                        <p>{account.email}</p> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
    </section>
}