import { PasswordField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";
import { logIntoAccount } from "../APIFolder/loginApi";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export const LoginPage = () => {
    const navigate = useNavigate();
    const checkIfLoginSucc = (response) => {if(response.success === 1){
        navigate(`/users/${Cookies.get("username")}`);
    }else{
        window.alert("Fail");
    };}
    


    const login = (username, password) => {


        logIntoAccount({"username": username, "password": password}).then(response => checkIfLoginSucc(response)).catch(console.log("boner biter"));
        // console.log(response);
        
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