// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import { PasswordField, SelectField, TextField } from "../common";

// Method Imports
import { getAccountbyId, registerAccount, fetchSchools } from "../../APIFolder/loginApi";

export const SignUpPage = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [school, setSchool] = useState(undefined);

    const [schools, setSchools] = useState([]);

    // Initial Load
    useEffect(() => {
        if (localStorage.getItem("currUser") !== "{}") {
            navigate('/');
        }
        fetchSchools().then(res=>{
            console.log(res)
            let temp_schools = []
            for(const i in res){
                temp_schools.push(res[i].school_name)
            }
            setSchools(temp_schools)
        })
    }, []);

    // Conditions

    // Component Methods
    const clickAddAccount = () => {
        if (username && password && firstName && lastName && school) {
            let temp = {
                "username": username,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "school": school
            };
            registerAccount(temp)
                .then(res => {
                    if (res.success !== 1) {
                        window.alert(`Failed to Sign Up. ${res.error}`);
                    }
                    else {
                        navigate('/login');
                    }
                })
        }
        else if (!username || !password || !firstName || !lastName || !school) {
            window.alert("Please fill out all fields");
        }
        else {
            window.alert("Username is already taken");
        }
    }

    // HTML
    return <section id="loginView">
        <h1 className="text-success">Sign Up</h1>
        <form className="container">

            <TextField label="First Name"
                value={firstName}
                setValue={x => setFirstName(x)} />
            <TextField label="Last Name"
                value={lastName}
                setValue={x => setLastName(x)} />
            <TextField label="Username"
                value={username}
                setValue={x => setUsername(x)} />

            {/* Need to change all the generic classes to id passed in since
             I click on "Password" and it takes me to the Username field" */}

            <PasswordField label="Password"
                value={password}
                setValue={x => setPassword(x)} />
            <SelectField label="School"
                options={schools}
                value={school}
                setValue={setSchool} />
            <button
                type="button"
                onClick={() => clickAddAccount()}
                variant="contained"
                className="btn btn-success text-light">
                Sign Up
            </button>
        </form>

             <p className="fs-3" >Already Have an account?</p>
             <button
                type="button"
                onClick={() => navigate('/login')}
                variant="contained"
                className="btn btn-secondary text-light">
                Login
            </button>
    </section>
}