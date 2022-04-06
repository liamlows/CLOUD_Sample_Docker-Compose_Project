import { PasswordField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { logIntoAccount } from "../../APIFolder/loginApi";


export const LoginPage = ({currUser, setCurrUser}) => {
    const navigate = useNavigate();
    const checkIfLoginSucc = (response) => {if(response.success === 1){
        Cookies.set("username", `${username}`);
        setCurrUser(username);
        navigate('/');

    }else{
        window.alert("Password for given username is incorrect");
    };}

    //will prevent someone from logging in if they are currently logged in
    if(!currUser === ''){
        navigate('/');
    }

    const login = (username, password) => {
        logIntoAccount({"username": username, "password": password}).then(response => checkIfLoginSucc(response)).catch();
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <section id="loginView">
        <h1>Login</h1>
        <form className="container">
            <TextField label="Username"
                value={username}
                setValue={x => setUsername(x)} />

            {/* Need to change all the generic classes to id passed in since I click on "Password" and it takes me to the Username field" */}

            <PasswordField label="Password"
                value={password}
                setValue={x => setPassword(x)} />

            <button 
            type="button" 
            onClick={() => login(username,password)}
            variant="contained" 
            color="success">
                Login
            </button>
            {/* <GenericButton label="Login" click="/loggedIn" /> */}
            <p className="mb-0">or</p>
            <GenericButton label="Sign Up" click="/signUp" />
        </form>
        
    </section>;
}