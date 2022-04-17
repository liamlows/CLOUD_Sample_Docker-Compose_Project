// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import { PasswordField, SelectField, TextField } from "../common";

// Method Imports
import { getAccountbyUsername, registerAccount } from "../../APIFolder/loginApi";

export const SignUpPage = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [school, setSchool] = useState(undefined);
    const [accountTypes] = useState([
        "Student",
        "Teacher"
    ]);
    const [schools] = useState([
        "Yuh",
        "Mega Yuh"
    ]);

    // Initial Load
    useEffect(() => {
        if (localStorage.getItem("currUser") !== "{}") {
            navigate('/');
            props.setNavigated(true);
        }
    });

    // Conditions

    // Component Methods
    const clickAddAccount = () => {
        if (username && password && firstName && lastName && email) {
            var temp = {
                "username": username, 
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "school": school
            };
            registerAccount(temp)
                .then(res => {
                    if (res.success !== 1) {
                        window.alert(`Failed to Sign Up. ${res.error}`);
                    }
                    else {
                        getAccountbyUsername(res.username)
                            .then(x => {
                                localStorage.setItem("currUser", JSON.stringify(x));
                                navigate('/');
                            });
                    }
                })
        }
        else if (!username || !password || !firstName || !lastName || !email) {
            window.alert("Please fill out all fields");
        }
        else {
            window.alert("Username is already taken");
        }
    }

    // HTML
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
            <SelectField label="School"
                options={schools}
                value={school}
                setValue={setSchool} />
            <button
                type="button"
                onClick={() => clickAddAccount()}
                variant="contained"
                color="success">
                Sign Up
            </button>
        </form>
    </section>
}