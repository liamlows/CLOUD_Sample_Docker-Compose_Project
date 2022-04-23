// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Add from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import ClearIcon from '@mui/icons-material/Clear';

// Component Imports
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import { TextField } from "../common";

// Method Imports
import { getAccountbyUsername, getAllCourses, getFriendRequests, getProfiles, handleFriendRequest, logout, sendFriendRequest } from "../../APIFolder/loginApi"


export const AddClasses = ({ pages, settings, setNavigated }) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});
    const [courses, setCourses] = useState([]);
    const [cName, setCName] = useState('');
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        console.log("running");
        // setProfiles(false);
        getAllCourses().then(res => {
            console.log("Getting requests")
            console.log(res);
            setCourses(res);
            // getAllCourses().then(clssRes => {
            //     let status = [];
            //     // loop through each request
            //     for (const profile in res) {
            //         status[profile] = 0;
            //         for (const req in frReq) {
            //             // check if the request is to the current user
            //             if (frReq[req].requester_id === res[profile].account_id) {
            //                 // if the friend request has not been accepted
            //                 if (frReq[req].status === -1) {
            //                     status[profile] = 2; // display accept request button
            //                     console.log("changing status to a 2", status);
            //                 }
            //                 // if the request has been accepted
            //                 else if (frReq[req].status === 1) {
            //                     status[profile] = 3; // display friend tag
            //                     console.log("changing status to a 3", status);
            //                 }
            //                 else if(frReq[req].status === 0){
            //                     status[profile] = 4; 
            //                     console.log("changing status to a 4", status);
            //                 }
            //             }
            //             // check if the request is from the user
            //             else if (frReq[req].requested_id === res[profile].account_id) {
            //                 // if the request has not been accepted
            //                 if (frReq[req].status === -1 || frReq[req].status === 0) {
            //                     status[profile] = 1; // display disabled button
            //                     console.log("changing status to a 1", status);
            //                 }
            //                 // if the request has been accepted
            //                 else if (frReq[req].status === 1) {
            //                     status[profile] = 3; // display friend tag
            //                     console.log("changing status to a 3", status);
            //                 }
            //                 else if(frReq[req].status === 0){
            //                     status[profile] = 4; 
            //                     console.log("changing status to a 4", status);
            //                 }
            //             }
            //         }
            //     }
            //     addStatusToProfiles(res, status);
            // });
        });
    }, [dummy]);

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
            setNavigated(true);
            navigate('/');
        }
    }

    // Component Methods
    const goToCourse = course => {
        navigate(`/classes/${course.id}`);
    }

    const goToSchedule = () => {
        navigate(`/classes/eronll`);
    }

    // const addStatusToProfiles = (dummy, statuses) => {
    //     console.log("Adding status to profile")
    //     let profiles2 = [];
    //     for (const profile in dummy) {
    //         profiles2.push({ ...dummy[profile], status: statuses[profile] });
    //     }
    //     setProfiles(profiles2);
    // }


    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "{}");
            navigate('/');
        });
    }

    const profileNav = () => {
        navigate(`users/${account.username}`);
    }

    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    // const displayUser = (profile) => {
    //     if (profile.status === 3) {
    //         console.log("already friends");
    //         return false;
    //     }
    //     if (profile.account_id === account.account_id) {
    //         return false;
    //     }
    //     return true;

    // }

    // const readyToDisplay = () => {
    //     console.log("profiles", profiles);
    //     if (profiles !== undefined && profiles[0] !== undefined && profiles[0].status !== undefined) {
    //         return true;
    //     }
    //     return false;
    // }

    // HTML
    // if (readyToDisplay()) {
        if(courses !== []){
        return <div>
            <LoggedInResponsiveAppBar
                pages={pages}
                settings={settings}
                signOut={() => signOut()}
                username={account.username}
                profileNav={() => profileNav()}
                account={() => accountNav()} />

            <div className="container border-0 mt-3">
                <button type="button" className="float-end btn btn-success mt-3" onClick={() => goToSchedule()}>Schedule</button>
                <div className="container border-0 col-3 float-start">
                    <TextField label="Search by Username" value={cName} setValue={setCName} />
                </div>
                <div className="clearfix"></div>
            </div>

            {/* TODO: Want to implement virtulized table eventually but regular table for now */}
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Number</th>
                        <th className="col-3">Professor</th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log("RENDER", typeof (profiles))} */}
                    {courses.map((course, idx) => {
                        return <tr key={idx} className="container">

                            <td>{course.username}</td>
                            <td>{course.first_name}</td>
                            <td>{course.last_name}</td>

                            <td className="col-3 pb-2">
                                {course.status === 2 &&
                                    <Button variant="contained" className="bg-primary col-7 m-1 mt-0 mb-0" onClick={() => { handleFriendRequest(course.account_id, 1).then(setDummy(dummy + 1)) }} endIcon={<Add />}>Accept Request</Button>
                                }
                                {course.status === 2 &&
                                    <Button variant="contained" className="bg-danger col-2" onClick={() => { handleFriendRequest(course.account_id, 0).then(setDummy(dummy + 1)) }}><ClearIcon /></Button>
                                }
                                {course.status === 1 &&
                                    <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Sent Request</Button>
                                }
                                {course.status === 0 &&
                                    <Button variant="contained" className="bg-success" onClick={() => { sendFriendRequest(course.account_id).then(setDummy(dummy + 1)) }} endIcon={<Add />}>Add Friend </Button>
                                }
                                {course.status === 4 &&
                                    <Button variant="contained" disabled endIcon={<ClearIcon color='disabled' />}>Redacted</Button>
                                }
                            </td>
                            <td className="col-3">
                                <Button variant="contained"
                                    className="btn bg-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToCourse(course)}>
                                    View course
                                </Button>
                            </td>

                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    }
    else {
        return <>Loading...</>
    }
}