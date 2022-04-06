import { getEmailbyUsername, getFirstNamebyUsername, getLastNamebyUsername, updateAccountbyId, getAccountbyUsername } from "../../APIFolder/loginApi";
import { PasswordField, TextField } from "../common";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './AccountInfo.css';

export const AccountInfo = ({loadedUser, props}) => {

    const navigate = useNavigate();
    let editUserNameMode = false;
    let editPasswordMode = false;
    let confirmUserName = false;
    let confirmPassword = false;
    let currUser = props.username;

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState(undefined);

    useEffect(() => { }, [editUserNameMode, editPasswordMode, confirmUserName, confirmPassword]);

    if (!account) {
        getAccountbyUsername(props.username).then(x => setAccount(x));
    }

    const changeUserName = delta => setAccount({ ...account, ...delta });
    const changePassword = delta => setAccount({ ...account, ...delta });

    const updateUserName = () => { editUserNameMode = true; }

    const confirmUserNameUpdate = () => { confirmUserName = true; }

    const doneUserNameEditing = (bool) => {
        if (bool) {
            //use currUser here to access database and change username
            //updateAccount
            //update currUser
        }
        editUserNameMode = false;
        confirmUserName = false;

    }


    //need to have user id
    //https://localhost:8000/api/d/school

    const updatePassword = () => { editPasswordMode = true; }

    const confirmPasswordUpdate = () => { confirmPassword = true; }

    const donePasswordEditing = (bool) => {
        if (bool) {
            //updateAccount
        }
        editPasswordMode = false;
        confirmPassword = false;

    }
    //This is where username and password can be edited

    return <section className="userAccount">
        <h1>{props.username}</h1>
        {editUserNameMode && <div>
            <TextField label="Username :" value={account.username} setValue={x => changeUserName(x)} />
            <button onClick={confirmUserNameUpdate()}>Save</button>
        </div>}
        {!editUserNameMode && <div>

            <h2>Username :</h2>
            <p>{account.username}</p>
            <button onClick={updateUserName()}>Change Username</button>
        </div>}
        {editPasswordMode && <div>
            <PasswordField label="Password: " value='' setValue={x => changePassword(x)} />
            <button onClick={confirmUserNameUpdate()}>Save</button>
        </div>}
        {!editPasswordMode && <div>

            {/* <h2>Password :</h2> */}
            <PasswordField label="Password: " value="default value" />
            <button onClick={updatePassword()}>Change Password</button>
        </div>}
        {confirmUserName && <div className=".confimWindowOuter">
            <div className=".confirmWindowInner">
                <h1>Do you really want to update your username?</h1>
                <button type="button"
                    className="btn btn-danger rounded border-0"
                    onClick={doneUserNameEditing(true)}>
                    Confirm
                </button>
                <button type="button"
                    className="btn btn-light rounded border-0"
                    onClick={doneUserNameEditing(false)}>
                    Cancel
                </button>
            </div>
        </div>}

        {confirmPassword && <div className=".confimWindowOuter">
            <div className=".confirmWindowInner">
                <h1>Do you really want to update your password?</h1>
                <button type="button"
                    className="btn btn-danger rounded border-0"
                    onClick={donePasswordEditing(true)}>
                    Confirm
                </button>
                <button type="button"
                    className="btn btn-light rounded border-0"
                    onClick={donePasswordEditing(false)}>
                    Cancel
                </button>
            </div>
        </div>}

    </section>
}