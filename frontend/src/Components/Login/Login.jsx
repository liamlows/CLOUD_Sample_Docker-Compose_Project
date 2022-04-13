import { useState, useEffect, useContext } from "react";
import './Login.css';
import { login, register } from "../../api/account";
import { SignUp } from "../SignUp/SignUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
const Login = () => {
    const [user, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [err, setErr] = useState("")

    const context = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (err) {
            setTimeout(() => {
                setErr("");
            }, 4000);
        }

    }, [err]);

    const handleLogin = () => {
        context.setUserData({
            userId:1,
            userName:"billy",
            isFarmer:true,
            email:"Billybob@gmail.com"
        });
       
        if(location.state?.from){
            navigate(location.state.from);
        } else
            navigate('/dashboard');
        // login({ user, password })
        //     .then((res) => {
        //         localStorage.setItem("userData", res.data);
        //         console.log("super sucess")
        //     })
        //     .catch((err) => alert("error logging in: " + err));

    }

    const toggleSignUp = () => {

        setSignUp(prev => !prev);
    }
    return (

        <form>
            <div className="login-container">
                <div className="text-center fs-3 fw-bold">
                    Login
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="user" className="form-label">Username</label>
                    <input type="text" value={user} className ="form-control" name="user" id="user" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="password" className="form-label"> Password</label>
                    <input type="password" className ="form-control" value={password} name="user" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                
                <div class="col mb-4">
      
                    <Link to="/reset">Forgot password?</Link>
                </div>
                <button type="button" className="btn btn-primary mb-4" onClick={() => handleLogin()}>{"Login"}</button>
                <div className="text-center">
                    <span>Dont have an account? </span><Link to="/signup">Register</Link>
                </div>
            </div>
        </form>


    )
}
export default Login;