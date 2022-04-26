import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import './create.css';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { createAccount } from "../api/UsersAPI";

export const CreateAccount = () => {

    const [username, setUsername]=useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the username change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || name === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      createAccount(username, name, email, password);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

    return(<div className='Login-component'>
    <div className="whiteBox">
    <h1>Create Account</h1>
    <br/>
    <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

    <TextField helperText="Please choose a username" id="demo-helper-text-misaligned" label="Username"
    value={username}
    onChange={handleUsername}
    />
    <br/>
    <br/>

    <TextField helperText="What name will you go by?" id="demo-helper-text-misaligned" label="Name"
    value={name}
    onChange={ handleName }
    />
    <br/>
    <br/>

    <TextField helperText="Please enter your email" id="demo-helper-text-misaligned" label="Email"
     value={email}
     onChange={ handleEmail }
    />
    <br/>
    <br/>

    <TextField helperText="Please choose a password" id="demo-helper-text-misaligned" label="Password"
     value={password}
     onChange={ handlePassword }
     />

   <br/> <br/> <br/>
   <Button variant="outlined"
   onClick={ handleSubmit }
   ><Link to='/home' className="createLink">Create</Link></Button>

   <br/>
    </div>
    </div>);
}