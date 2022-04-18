// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Component Imports
import { LoggedInResponsiveAppBar } from "../common/LoggedInResponsiveAppBar";

// Method Imports
import { getAccountbyUsername, logout } from "../../APIFolder/loginApi";

export const HomeView = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});

    // Initial Load
    useEffect(() => {
        if (JSON.stringify(account) === "{}")
            setAccount(JSON.parse(localStorage.getItem("currUser")));
        console.log("Loading HomeView...");
    }, [account]);

    console.log(account);

    // Conditions
    if (JSON.stringify(account) === "{}") {
        let username = Cookies.get("username");
        if (username) {
            getAccountbyUsername(username)
                .then(account => {
                    if (account) {
                        localStorage.setItem("currUser", JSON.stringify(account));
                        setAccount(account);
                    }
                    else {
                        console.log("User is null after request");
                    }
                });
        }
        else {
            navigate('/');
        }
    }

    // Component Methods
    const signOut = () => {
        logout().then(() => localStorage.setItem("currUser", "{}"));
    }
    const profileNav = () => {
        navigate(`users/${account.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    // HTML
    return <div>
        <LoggedInResponsiveAppBar
            pages={props.loggedInPages}
            settings={props.settings}
            signOut={() => signOut()}
            username={account.username}
            profileNav={() => profileNav()}
            accountNav={() => accountNav()} />
        <div className="col-6 p-0"><div className="col-1 p-0"></div><h1 className="col-6 mt-4 fs-2">Welcome {account.firstName}</h1></div>
        <div className="clearfix p-0"></div>
        <div className="row mt-5 m-3">
            <div className="col-6 border p-5">
                Add Classes Here
            </div>
            <div className="col-6 border p-5">
                Add Notifications Here
            </div>
        </div>
    </div>
}