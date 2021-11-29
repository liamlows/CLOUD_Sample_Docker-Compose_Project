import { Link } from "react-router-dom";

export const Logout = () => {

    const setFalse = () =>{
        localStorage.setItem("adminLogin", false);
    }
    return <>
        <h1>
            You are Logout!
        </h1>

        <Link to = "/" onClick ={setFalse}> Back to Home 
        {localStorage.getItem("adminLogin")} </Link>
    </>
}