import { PasswordField, TextField } from "../common";
import { useState } from "react";
import { GenericButton } from "../common/GenericButton";


export const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <div>
        <h1>Login</h1>
        <form className="container">
            <TextField label="Username"
                value={username}
                setValue={x => setUsername(x)} />

            <PasswordField label="Password"
                value={password}
                setValue={x => setPassword(x)} />
        </form>
        <GenericButton label="Login" />
    </div>;
}