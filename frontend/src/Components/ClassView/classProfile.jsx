// Libary Imports
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Cookies from "js-cookie";
import { Button, stepButtonClasses } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./classProfile.css";


// Component Imports
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


// Method Imports
import { getAccountbyUsername, logout, sendEnrollmentRequest, updateAccountbyUsername, getAccountbyId, getCourseById, getCourseRequest } from "../../APIFolder/loginApi";

export const ClassProfile = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    const location = useLocation();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [editMode, setEditMode] = useState(false);
    const [reload, setReload] = useState(false);
    const [course, setCourse] = useState({
        course_name: "Algorithms",
        course_number: "CS 3353",
        course_description: "Insert course description here",
        course_id: 1
    });
    const [professor, setProfessor] = useState({
        first_name: "Wes",
        last_name: "Anderson",
        username: "wes",
        account_id: 1
    });
    const [tas, setTAs] = useState([
        { first_name: "first1", last_name: "last1", account_id: 10 },

        { first_name: "first2", last_name: "last2", account_id: 20 }
    ]);
    const [account, setAccount] = useState({})
    const [accountType, setAccountType] = useState()

    const params = useParams();

    // Initial Load
    useEffect(() => {
        let status = 0;

        // if (JSON.stringify(account) === "{}")
        //     setAccount(JSON.parse(localStorage.getItem("currUser")));

        // getCourseById(params.course_id).then(loaded => {
        //     // get the table of friend requests
        //     getCourseRequest(loaded.course_id).then(res => {

        //     }).catch(code => {
        //         if (code === 404) {
        //             status = 0;
        //         }

        //     }).then(() => {
        //         console.log("Adding status to course");
        //         setCourse({ ...loaded, status: status });
        //         console.log(course);
        //     }).then(() => {
        //         getAccountbyId(course.professor_id).then(account => setProfessor(account));
        //         setTAs([]);
        //         let newTas = []
        //         for (const ta in course.tas) {
        //             getAccountbyId(course.tas[ta]).then(person => newTas.push(person))
        //         }
        //         setTAs(newTas);
        //     });
        // })
    }, [editMode, reload]);


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
            props.setNavigated(1);
            navigate('/');
        }
    }

    // Component Methods
    const startEditing = () => {
        setEditMode(true);
        changeCourse({ ...course });
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

    const sendEnrollmentRequestFunc = () => {
        console.log("sending friend request");
        sendEnrollmentRequest()
        setReload(!reload)
    }

    const canEdit = () => {
        //check if listed as professor or ta for the class
        if (accountType === "admin") {
            console.log("user is an admin")
            return true;
        }
        if (account.account_id === professor.account_id) {
            console.log("user is the professor")
            return true;
        }
        for (const ta in tas) {
            if (account.account_id === tas[ta].account_id) {
                console.log("user is a ta")
                return true;
            }
        }
        return false;
    }

    const changeCourse = delta => setCourse({ ...account, ...delta });

    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    console.log("Account before if statement", account);
    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED
    if (JSON.stringify(account) !== "{}") {
        return <section className="userProfile">
            <LoggedInResponsiveAppBar
                pages={props.pages}
                settings={props.settings}
                signOut={() => signOut()}
                username={account.username}
                profileNav={() => profileNav()}
                account={() => accountNav()} />

            {/* Viewing editable class (EDITING) */}
            {canEdit() === true && editMode === true &&
                <div className="container border-0 mt-5">
                    <div className="row bg-light p-4">
                        <div className="col-7 float-start mt-1">
                            <table className='table float-start'>
                                <thead>
                                    <th className="float-start col-11 fs-3 mt-2 text-start"><span className="text-start p-0">{course.course_name} ({course.course_number})</span></th>

                                    <th className="col-1">
                                        <button type="button" className="btn btn-light" onClick={() => startEditing()}>Edit Course</button>
                                    </th>
                                </thead>
                                <tbody>
                                    <tr className="border-0">
                                        <td className="col-3 fs-6 text-start border-0">
                                            <TextField label="Course Name :" value={course.course_name} setValue={course_name => changeCourse({ course_name })} />
                                        </td>
                                    </tr>
                                    <tr className="border-0">
                                        <td className="col-3 fs-6 text-start border-0">
                                            <TextField label="Course Number :" value={course.course_number} setValue={course_number => changeCourse({ course_number })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>

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

            {/* Viewing editable class (NOT EDITING) */}
            {canEdit() === true && editMode === false &&
                <div className="container border-0 mt-5">
                    <div className="row bg-light p-4">
                        <div className="col-7 float-start mt-1">
                            <table className='table float-start'>
                                <thead>

                                    <th className="float-start col-11 fs-3 mt-2 text-start">{course.course_name} ({course.course_number})</th>
                                    <th className="col-1">
                                        <button type="button" className="btn btn-light" onClick={() => startEditing()}>Edit Course</button>
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
                        <div className="ProfessorProfile col-5 mt-1 bg-light2">
                        <table className='table float-start'>
                                <thead>

                                    <th className="float-start col-11 fs-3 mt-2 text-start">Professor</th>
                                    <th className="col-1">
                                    <Button variant="contained"
                                className="btn bg-secondary"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate(`/users/${professor.username}`)}>
                                View Profile
                            </Button>
                                    </th>
                                </thead>
                                <tbody>
                                    <td className="col-3 fs-6 text-start">
                                        <span className="p-0 text-capitalize">{professor.first_name} </span><span className="p-0 text-capitalize" >{professor.last_name}</span>
                                    </td>
                                    {/* <h2>Email :</h2>
                            <p>{account.email}</p> */}
                                </tbody>
                                </table>

                        </div>
                    </div>
                </div>}

            {/* Viewing non editable class */}
            {!canEdit() &&
                <div>
                    <div className="row">
                        <div className="col-3 float-end">
                            <Button variant="contained" className="m-3" onClick={() => navigate('/classes/enrollment')} startIcon={<KeyboardBackspaceIcon />}>Return to Search</Button>
                        </div>
                    </div>
                    <div className="clearfix p-0"></div>
                    <div className="container border-0 mt-3">
                        <div className="row bg-light p-4">
                            <div className="col-7 float-start mt-1">
                                <table className='table float-start'>
                                    <thead>
                                        <th className="float-start col-3 fs-3 mt-2 text-start">{account.username}</th>
                                        {accountType === "student" && account.status === -1 && <th className="col-2 pb-2">
                                            <Button variant="contained" className="bg-success" onClick={() => sendEnrollmentRequestFunc()} endIcon={<Add />}>Waitlist</Button>
                                        </th>}
                                        {accountType === "student" && account.status === 0 && <th className="col-2 pb-2">
                                            <Button variant="contained" className="bg-success" onClick={() => sendEnrollmentRequestFunc()} endIcon={<Add />}>Enroll</Button>
                                        </th>}
                                        {accountType === "student" && account.status === 1 && <th className="col-2 pb-2">
                                            <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Waitlist</Button>
                                        </th>}
                                        {account.status === 2 && <div className="float-end col-2 mb-1 mt-2">
                                            <div className="clearfix p-0"></div>
                                            <th className="col-1 rounded bg-success border-0 p-1">
                                                <div className="bg-success text-white">
                                                    Enrolled <Check className='mb-1 m-1 mt-0' />
                                                </div>
                                            </th>
                                        </div>}

                                    </thead>
                                    <tbody>
                                        <td className="col-3 fs-6 text-start">
                                            <span className="p-0 text-capitalize">{account.first_name} </span><span className="p-0 text-capitalize" >{account.last_name}</span>
                                        </td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>}


            {/* <ReviewList/>  To be implemented, need to check if user is eligible to submit review (has not submitted before, and either currently enrolled or previously enrolled*/}
        </section>
    }
    return <></>;
}