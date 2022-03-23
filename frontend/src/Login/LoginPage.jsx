import { PasswordField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";


export const LoginPage = () => {

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

            <GenericButton label="Login" click="/loggedIn" />
            <p className="mb-0">or</p>
            <GenericButton label="Sign Up" click="/signUp" />
        </form>
        
    </section>;
}