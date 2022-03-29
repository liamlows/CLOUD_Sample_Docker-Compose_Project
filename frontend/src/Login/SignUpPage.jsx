import { PasswordField, SelectField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";
import { addAccount } from "../APIFolder/loginApi";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ accountType, setAccountType ] = useState('');
    const [ accountTypes ] = useState([
        "Student",
        "Teacher"
    ]);

    const [ account, setAccount ] = useState([]);

    // const mergeAccount = delta => setAccount({ ...account, ...delta });

    return <section id="loginView">
        <h1>Sign Up</h1>
        <form className="container">
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
            onClick={() => addAccount({"username": username, "password": password}).then(navigate('/login').catch(window.alert("Failed to Sign Up")))}
            variant="contained" 
            color="success">
                Sign Up
            </button>
            {/* <GenericButton label="Sign Up" click="/login" /> */}
        </form>

    </section>;
}
