import { PasswordField, SelectField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";
import { getAccountbyUsername, registerAccount } from "../../APIFolder/loginApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const SignUpPage = ({ currUser, setCurrUser }) => {
    const navigate = useNavigate();

    const clickAddAccount = () => {
        if (username && password && firstName && lastName && email) {
            registerAccount({ "username": username, "password": password, "firstName": firstName, "lastName": lastName, "email": email })
                .then(response => {
                    if(response.success === 1){
                        getAccountbyUsername(response.username)
                            .then(user => user && setCurrUser(user))
                            .then(() => navigate('/'));
                    }
                    else {
                        window.alert(`Failed to Sign Up. ${response.error}`);
                    }
                });
        }
        else if(!username || !password || !firstName || !lastName || !email){
            window.alert("Please fill out all fields");
        }
        else{
            window.alert("Username is already taken");
        }
    }

    //prevents a logged in user from signing up
    if (currUser !== '') {
        navigate('/');
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountTypes] = useState([
        "Student",
        "Teacher"
    ]);

    const [account, setAccount] = useState([]);

    // const mergeAccount = delta => setAccount({ ...account, ...delta });

    return <section id="loginView">
        <h1>Sign Up</h1>
        <form className="container">

            <TextField label="First Name"
                value={firstName}
                setValue={x => setFirstName(x)} />
            <TextField label="Last Name"
                value={lastName}
                setValue={x => setLastName(x)} />
            <TextField label="Email"
                value={email}
                setValue={x => setEmail(x)} />
            {/* May want to use for confirmations in the future? If we can figure it out */}
            <TextField label="Username"
                value={username}
                setValue={x => setUsername(x)} />

            {/* Need to change all the generic classes to id passed in since
             I click on "Password" and it takes me to the Username field" */}

            <PasswordField label="Password"
                value={password}
                setValue={x => setPassword(x)} />
            <SelectField label="Account Type"
                options={accountTypes}
                value={accountType}
                setValue={setAccountType} />
            <button
                type="button"
                onClick={() => clickAddAccount()}
                variant="contained"
                color="success">
                Sign Up
            </button>
            {/* <GenericButton label="Sign Up" click="/login" /> */}
        </form>

    </section>;
}
