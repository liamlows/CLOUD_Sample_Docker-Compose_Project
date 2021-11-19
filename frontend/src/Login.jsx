import './styles/Login.css';
import React from 'react';
import { v1 as uuidv1 } from 'uuid';
import { Link } from 'react-router-dom';


export class Login extends React.Component {
    validateLogin(){
        //TODO: AXIOS CALL TO VALIDATE LOGIN
        //userID = getUserID axios call
        //FOR NOW: JUST LOGIN SUCCESSFUL
        var userID = uuidv1(); //uniqueID generator
        this.props.onLogin(userID);
    }
    render (){
        return <div>
            <section id="LoginPage">
                {/* a box extending the width of the screen with margins up and down to show the background picture */}
                {/* have a default login image of a person or something here */}
                <img src={"https://via.placeholder.com/150"} alt="Login Person"/>
                {/* login title*/}
                <h1>FLAME WAR LOGIN</h1>
                {/* inside the box, have:
                two text fields for login username and password
                a button to login
                a generic login picture above these
                */}
                <input type={"text"} placeholder={"Username"}/> {/* this is for the username */}

                <input type={"text"} placeholder={"Password"}/> {/* this is for the password */}

                {/* this function (onClick={}) will need to be updated in future - this is to login */}
                <button type="button" onClick={() => this.validateLogin()}>
                    Login
                </button>

                {/* Add a link for a sign up option */}
                <p>New user? <Link to={"/registration"}>SIGN UP</Link></p>
            </section>
        </div>
    }
}