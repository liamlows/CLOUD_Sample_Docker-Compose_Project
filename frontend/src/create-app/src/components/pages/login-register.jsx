import { TextField } from "../common/textField.jsx";
import { useEffect, useState } from "react";

export const Login = (props) => {
  const {setAccount} = props;
  const {setScreen} = props;
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  return <>
    <div className='container-fluid mt-5'>
      <div className="row justify-content-center">
        <div className='col-2'></div>
        <div className='col me-3'>
          <h2 className='text-center'>Login</h2>
          <TextField label="Username:" value={loginUsername} setValue={setLoginUsername}/>
          <TextField label="Password:" value={loginPassword} setValue={setLoginPassword}/>
          {(loginUsername == '' || loginPassword == '') &&
          <button type="button" className="btn btn-md btn-primary" disabled>Login</button>}
          {loginUsername !='' && loginPassword != '' &&
          <button type="button" className="btn btn-md btn-primary"
          onClick={() => {
            setAccount({username:loginUsername, password:loginPassword});
          }}>Login</button>}
        </div>
        <div className='col ms-3'>
          <h2 className='text-center'>Register</h2>
          <TextField label="Username:" value={registerUsername} setValue={setRegisterUsername}/>
          <TextField label="Password:" value={registerPassword} setValue={setRegisterPassword}/>
          {(registerUsername == '' || registerPassword == '') &&
          <button type="button" className="btn btn-md btn-primary" disabled>Register</button>}
          {registerUsername !='' && registerPassword != '' &&
          <button type="button" className="btn btn-md btn-primary"
          onClick={() => {

          }}>Register</button>}
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  </>;
}
