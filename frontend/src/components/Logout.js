import { Link } from "react-router-dom";

export const Logout = () => {

    const setFalse = () =>{
        localStorage.setItem("adminLogin", false);
    }
    return <>
        <h1>
            Are you sure you want to Logout?
        </h1>

        <Link to = "/" onClick ={setFalse}> Yes
        </Link>
        <br/>
        <br/>
        <br/>
        <br/>
        <Link to = "/" > Nevermind!
        </Link>
    </>
}