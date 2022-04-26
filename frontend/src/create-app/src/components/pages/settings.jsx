import { TextField } from "../common/textField.jsx";
import { useEffect, useState } from "react";

export const Settings = (props) => {
  const {account} = props;
  const {setAccount} = props;
  const [userName, setUsername] = useState('');
  const [confirmUserName, setConfirmUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return <>
  <div className='container text-center mt-5'>
    <h1>Info:</h1>
    <p>Username: {account.username}</p>
    <p>Password: {account.password}</p>
    <p></p>
    <p></p>
  </div>
  <div className='container-fluid mt-2'>
    <div className="row justify-content-center">
      <div className='col-2'></div>
      <div className='col me-3'>
        <h2 className='text-center'>Change Username</h2>
        <TextField label="Username:" value={userName} setValue={setUsername}/>
        <TextField label="Confirm Username:" value={confirmUserName} setValue={setConfirmUserName}/>
        {(userName == '' || confirmUserName == '' || userName != confirmUserName) &&
        <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
        {userName !='' && confirmUserName != '' && userName == confirmUserName &&
        <button type="button" className="btn btn-md btn-primary"
        onClick={() => {
          setAccount({username:userName, password:account.password});
          setUsername('');
          setConfirmUserName('');
        }}>Submit</button>}
      </div>
      <div className='col ms-3'>
        <h2 className='text-center'>Change Password</h2>
        <TextField label="Password:" value={password} setValue={setPassword}/>
        <TextField label="Confirm Password:" value={confirmPassword} setValue={setConfirmPassword}/>
        {(password == '' || confirmPassword == '' || password != confirmPassword) &&
        <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
        {password !='' && confirmPassword != '' && password == confirmPassword &&
        <button type="button" className="btn btn-md btn-primary"
        onClick={() => {
          if(password == confirmPassword){
            setAccount({username:account.username, password:password});
            setPassword('');
            setConfirmPassword('');
          }
        }}>Submit</button>}
      </div>
      <div className='col-2'></div>
    </div>
  </div>
  </>;
}
