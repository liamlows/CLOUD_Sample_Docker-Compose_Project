// Libary Imports
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from '@mui/icons-material/Clear';

import "./Profile.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// Component Imports
import {doSignOut, TextField} from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


// Method Imports
import { getFriendRequests, getStatusById, handleFriendRequest, logout, sendFriendRequest, updateAccountbyId, getFriendRequest, getFriendsClasses, uploadPP, getAccountbyId, updateAccount, getCoursebyId } from "../../APIFolder/loginApi";
import { TextAreaField } from "../common/TextAreaField";
import { ReviewList } from "../common/ReviewList";

import { websocket } from "../../client-websocket";



export const Profile = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [online, setOnline] = useState(false);
    const [reload, setReload] = useState(false);
    const [classes, setClasses] = useState([]);
    const [currUser, setCurrUser] = useState({})

    const [pp, setPP] = useState(undefined);
    const params = useParams();
    const location = useLocation();


    // Initial Load
    useEffect(() => {
        let status = 0;


        getAccountbyId(params.account_id).then(async loaded => {
            getStatusById(loaded.account_id).then((status) => setOnline(!!status.status));


            // get the table of friend requests
            if (loaded.username !== JSON.parse(localStorage.getItem("currUser")).username) {

                let res;
                try {
                    res = await getFriendRequest(loaded.account_id);
                }
                catch {
                    res = {};
                }
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



                if (account.account_id !== JSON.parse(localStorage.getItem("currUser")).account_id) {
                    console.log(status, loaded);
                    if (account.status !== status) {
                        console.log("Adding status to account");
                        setAccount({ ...loaded, status: status });
                        console.log(account);
                    }
                }

                if (status === 3) {
                    getFriendsClasses(loaded.account_id).then(res => {
                        let temp_courses = []
                        for (const i in res) {
                            getCoursebyId(res[i].course_id).then(course => {
                                temp_courses.push(course)
                                setClasses([...temp_courses])
                            })
                        }
                    })


                }

            }
            else {
                console.log("profiles are the same")
                setAccount({ ...loaded, status: 3 });
                getFriendsClasses(loaded.account_id).then(res => {
                    let temp_courses = []
                    for (const i in res) {
                        getCoursebyId(res[i].course_id).then(course => {
                            temp_courses.push(course)
                            setClasses([...temp_courses])
                        })
                    }

                })

            }
        })
    }, [editMode, reload]); //lol the useEffect is just here now.

    if (account.account_id && account.account_id != params.account_id) {
        let status = 0;

        getAccountbyId(params.account_id).then(async loaded => {
            getStatusById(loaded.account_id).then((status) => setOnline(!!status.status));

            // get the table of friend requests
            if (loaded.username !== JSON.parse(localStorage.getItem("currUser")).username) {
                let res = await getFriendRequest(loaded.account_id)
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

                if (account.account_id !== JSON.parse(localStorage.getItem("currUser")).account_id) {
                    console.log(status, loaded);
                    if (account.status !== status) {
                        console.log("Adding status to account");
                        setAccount({ ...loaded, status: status });
                        console.log(account);
                    }
                }

                if (status === 3) {
                    let res2 = await getFriendsClasses(loaded.account_id)
                    setClasses(...res2);
                }

            }
            else {
                console.log("profiles are the same")
                setAccount({ ...loaded, status: 3 });
            }
        })
    }
    // Conditions
    if (JSON.stringify(currUser) === "{}") {
        let account_id = Cookies.get("account_id");
        if (account_id) {
            getAccountbyId(account_id)
                .then(account => {
                    if (account) {
                        localStorage.setItem("currUser", JSON.stringify(account));
                        setCurrUser(account);
                    }
                    else {
                        console.log("User is null after request");
                    }
                });
        }
        else {
            console.log(props)
            props.setNavigated(1);
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
            if (pp != undefined) {

                uploadPP(pp).then(() => {
                    window.location.reload();
                });
                setPP(undefined);
            }
            if (account.first_name.length > 255 || account.first_name.length > 255) {
                window.alert("First and last have a character limit of 255");
            }
            else if (account.bio.length > 1000) {
                window.alert("Bio has a character limit of 1000");
            }
            else {
                updateAccount(account).then(() => { setEditMode(false) });
                localStorage.setItem("currUser", JSON.stringify(account));
            }
            // window.location.reload();
        }
        else {
            window.alert("First name and last name cannot be blank");
        }
    }

    const cancel = () => {
        setEditMode(false);
    }

    const signOut = () => { doSignOut().then(() => navigate('/')) };


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



    const onFileChange = event => {

        // Update the state
        setPP(event.target.files[0]);

    };

    const goToCourse = (clss) => {
        navigate(`/classes/${clss.course_id}`);
    }
    const friendable = () => {
        if (JSON.parse(localStorage.getItem("currUser")).role.role_type !== "student" && JSON.parse(localStorage.getItem("currUser")).role.role_type !== "ta") {
            console.log("CurrUser is not student or ta")
            return false;
        }
        if (account.role.role_type !== "student" && account.role.role_type !== "ta") {
            console.log("Viewed Profile is not student or ta")
            return false;
        }
        console.log("Viewed Profile is Friendable")
        return true

    }

    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED
    if (JSON.stringify(account) !== "{}" && account.status !== undefined) {
        return <section className="userProfile">
            <LoggedInResponsiveAppBar
                pages={props.pages}
                settings={props.settings}
                signOut={() => signOut()}
                account_id={JSON.parse(localStorage.getItem("currUser")).account_id}
                account_type={JSON.parse(localStorage.getItem("currUser")).role.role_type} />

            {/* Viewing own profile (EDITING) */}
            {JSON.parse(localStorage.getItem("currUser")).username === account.username && editMode === true &&
                <div className="container border-0 mt-5">
                    <div className="row bg-light pb-4">
                        <div className="float-start col-4 m-3 mt-5 pb-5">
                            {account.pfp_url !== null && <img src={`${account.pfp_url}`} alt="" />}
                            {account.pfp_url === null && <img src="https://via.placeholder.com/300x300" alt="" />}
                        </div>
                        <div className="col-7 float-start mt-5">
                            <table className='table float-start'>
                                <thead>
                                    <tr>
                                        {online === true && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" color='success' /></th>}
                                        {online === false && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" sx={{ color: 'red' }} /></th>}
                                        <th className="float-start col-11 fs-3 mt-2 text-start"><span className="text-start p-0">{account.username}</span><button type="button" className="btn btn-light float-end col-3 p-0" onClick={() => startEditing()}>Edit Profile</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-0">
                                        <td className="col-12 fs-6 text-start border-0">
                                            <TextField label="First Name :" value={account.first_name} setValue={first_name => changeAccount({ first_name })} />
                                        </td>
                                    </tr>
                                    <tr className="border-0">
                                        <td className="col-12 fs-6 text-start border-0">

                                            <TextField label="Last Name :" value={account.last_name} setValue={last_name => changeAccount({ last_name })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><TextAreaField label="Bio :" value={account.bio} setValue={bio => changeAccount({ bio })} /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="roundered">
                                                <label for="file-upload" class="custom-file-upload">
                                                    <i class="fa fa-cloud-upload"></i> Upload Picture
                                                </label>
                                                <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png" onChange={(event) => onFileChange(event)} />
                                            </div>
                                            {pp !== undefined && <p>{pp.name}</p>}
                                        </td>
                                    </tr>
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
                        <div className="float-start col-4 m-3 mt-5 pb-5">
                            {account.pfp_url !== null && <img src={`${account.pfp_url}`} alt="" />}
                            {account.pfp_url === null && <img src="https://via.placeholder.com/300x300" alt="" />}
                        </div>
                        <div className="col-7 float-start mt-5">
                            <table className='table float-start'>
                                <thead>
                                    <tr>
                                        {online === true && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" color='success' /></th>}
                                        {online === false && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" sx={{ color: 'red' }} /></th>}
                                        <th className="float-start col-11 fs-3 mt-2 text-start">{account.username}<button type="button" className="btn btn-light float-end col-3 p-0" onClick={() => startEditing()}>Edit Profile</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="col-3 fs-6 text-start">
                                            <span className="p-0 text-capitalize">{account.first_name} </span><span className="p-0 text-capitalize" >{account.last_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">Bio:
                                            <p>{account.bio}</p>
                                        </td>
                                    </tr>
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
                            <Button variant="contained" className="m-3 bg-warning" onClick={() => navigate('/users')} startIcon={<KeyboardBackspaceIcon />}>Return to Search</Button>
                        </div>
                    </div>
                    <div className="clearfix p-0"></div>
                    <div className="container border-0 mt-3">
                        <div className="row bg-light pb-4">
                            <div className="float-start col-4 m-3 mt-5 pb-5">
                                {account.pfp_url !== null && <img src={`${account.pfp_url}`} alt="" />}
                                {account.pfp_url === null && <img src="https://via.placeholder.com/300x300" alt="" />}
                            </div>
                            <div className="col-7 float-start mt-5">
                                <table className='table float-start'>
                                    <thead className="col-12">
                                        <tr>
                                            {online === true && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" color='success' /></th>}
                                            {online === false && <th className="float-start mt-3 mb-1 online"><CircleIcon className="online col-1" sx={{ color: 'red' }} /></th>}
                                            <th className="float-start col-11 fs-3 mt-2 text-start">{account.username}
                                                {friendable() && account.status === 2 && <div className="col-3 p-0 pb-2 float-end">
                                                    <Button variant="contained" className="bg-primary" onClick={() => { handleFriendRequestFunc(1) }} endIcon={<Add />}>Accept Request</Button>
                                                    <Button variant="contained" className="bg-danger col-2" onClick={() => { handleFriendRequest(0) }}><ClearIcon /></Button>
                                                </div>}
                                                {friendable() && account.status === 1 && <div className="col-3 p-0 pb-2 float-end">
                                                    <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Request Sent</Button>
                                                </div>}
                                                {friendable() && account.status === 4 && <div className="col-3 p-0 pb-2 float-end">
                                                    <Button variant="contained" disabled endIcon={<ClearIcon color='disabled' />}>Redacted</Button>
                                                </div>}
                                                {friendable() && account.status === 0 && <div className="col-3 p-0  pb-2 float-end">
                                                    <Button variant="contained" className="bg-success" onClick={() => sendFriendRequestFunc()} endIcon={<Add />}>Add Friend </Button>
                                                </div>}
                                                {friendable() && account.status === 3 && <div className="col-3 p-0  pb-2 float-end">
                                                    <div className="col-8 float-start">
                                                        <Button variant="contained" className="bg-warning" disabled endIcon={<Check color='disabled' />}>Friends</Button>
                                                    </div>
                                                    <div className="col-1 float-end">
                                                        <Button variant="contained" className="bg-danger" onClick={() => handleFriendRequest(0)}><ClearIcon /></Button>
                                                    </div>
                                                </div>}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td className="col-3 fs-6 text-start">
                                            <span className="p-0 text-capitalize">{account.first_name} </span><span className="p-0 text-capitalize" >{account.last_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">Bio:
                                            <p>{account.bio}</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >}

            {
                account.role.role_type === "student" &&
                classes.length === 0 && (account.status === 3 || account.account_id === JSON.parse(localStorage.getItem("currUser")).account_id) && <div>
                    <h1>Classes</h1>
                    <p>{account.username} is not enrolled in any classes</p>
                </div>
            }
            {
                account.role.role_type === "student" &&
                classes.length === 0 && account.status !== 3 && account.account_id !== JSON.parse(localStorage.getItem("currUser")).account_id && <div>
                    <h1>Classes</h1>
                    <p>You must be friends with {account.username} to view their classes</p>
                </div>
            }
            {
                account.role.role_type === "student" && classes.length !== 0 && <div>
                    <h1>Classes</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col-3">Name</th>
                                <th className="col-3">Department</th>
                                <th className="col-3">Professor</th>
                                <th className="col-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((course, idx) => {
                                return (<tr key={idx} className="container">
                                    <td>{course.course_name}{console.log(course)}</td>
                                    <td>{course.department}</td>
                                    <td>{course.professors.length !== 0 && course.professors.map((professor) => {
                                        return `${professor.last_name}, ${professor.last_name}\n`;
                                    })}{course.professors.length === 0 && `No Professor`}</td>

                                    <td className="col-3 pb-2">
                                    </td>
                                    <td className="col-3">
                                        <Button variant="contained"
                                            className="btn bg-secondary"
                                            endIcon={<ArrowForwardIcon />}
                                            onClick={() => goToCourse(course)}>
                                            View course
                                        </Button>
                                    </td>

                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            }



            {
                //satisfying the review professor
                //honestly we may be able to get away with doing the flagging be a note saying "flagged reviews are seen as false or overly critical by professor"
                account.role.role_type === "professor" &&

                <ReviewList
                    type="Professor"
                    account_id={localStorage.getItem("currUser").account_id}
                    search_id={account.account_id} />

            }
        </section >
    }
    return <></>;
}