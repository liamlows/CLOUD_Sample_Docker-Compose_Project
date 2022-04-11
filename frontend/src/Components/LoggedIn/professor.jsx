import { getAccountbyUsername, getStatusByUsername, logout, updateAccountbyUsername } from "../../APIFolder/loginApi";
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

export const Profile = ({ currUser, setCurrUser, pages, settings, professor}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState('');
    const [loadedProfile, setLoadedProfile] = useState('');
    const [online, setOnline] = useState('');
    const [friend, setFriend] = useState(false);
    const [sentRequest, setRequest] = useState(false);


    if (!loadedProfile) {
        // get the account from the username
        return <>Loading...</>
        console.log("gae");
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
            getStatusByUsername(username).then(status => console.log(status) && setOnline(status));
        }
        else {
            setCurrUser('');
            window.alert("Please sign in to view profiles");
            navigate('/');
        }

    }

    return <section className="profProfile">
        <LoggedInResponsiveAppBar
            pages={pages}
            settings={settings}
            signOut={() => signOut()}
            username={currUser.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

            <div className="container border-0 mt-5">
                <div className="row bg-light pb-4">
                    <div className="col-7 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="float-start col-3 fs-3 mt-2 text-start">{professor.name}</th>
                            </thead>
                            <tbody>
                                 {/**TODO: Add data for professor */}
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{professor} </span>
                                    </td>
                            </tbody>
                            {/**TODO: Table with all courses professor teaches? (filtering) */}
                            <classMenu/>
                        </table>
                    </div>
                </div>
            </div>
    </section>
}