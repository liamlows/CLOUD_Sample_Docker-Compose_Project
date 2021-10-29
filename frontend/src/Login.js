import './Login.css';

function Login() {
    return (
        <main>
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
                <button>
                    Login
                </button>

                {/* Add a link for a sign up option */}
                <p>New user? <a href={""}>SIGN UP</a></p>
            </section>
        </main>
    )
}

export default Login;
