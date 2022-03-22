import { TextField } from "../common";
import { useState } from "react";


export const LoginPage = () => { 

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return <form className="container">
        <TextField label="Username"
                   value={username}
                   setValue={x => setUsername(x)} />

        <TextField label="Password"
                   value={password}
                   setValue={x => setPassword(x)} />
    </form>
}