import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

export const Logout = () => {

    const setFalse = () =>{
        localStorage.setItem("adminLogin", false);
    }
    return <>
        <h1>
            Are you sure you want to Logout?
        </h1>

        <Button variant="primary" href = "/" onClick ={setFalse}> Yes
        </Button>
        <br/>
        <br/>
        <Button variant="primary" href = "/" > Nevermind!
        </Button>
    </>
}