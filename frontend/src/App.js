import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { LoginPage } from './Components/Login/LoginPage';
// import { LoggedIn } from './LoggedIn/LoggedIn';
// import { Route } from reactDom;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Base } from './Components/BaseView/Base';
import { SignUpPage } from './Components/Login/SignUpPage';
import { Profile } from './Components/Profiles/Profile';
import { HomeView } from './Components/LoggedIn/HomeView';
import { AccountInfo } from './Components/Profiles/AccountInfo';

// React functional component
function App() {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res) => {
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  const fetchVals = () => {
    axios.get(`http://${url}:8000/values`).then(
      res => {
        const values = res.data.data;
        console.log(values);
        setValues(values)
      }).catch(err => {
        console.log(err)
      });
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    let prod = number * number;
    axios.post(`http://${url}:8000/multplynumber`, { product: prod }).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
    setNumber("");
  }

  // handle intialization and setup of database table, can reinitialize to wipe db
  const reset = () => {
    axios.post(`http://${url}:8000/reset`).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
  }

  // tell app to fetch values from db on first load (if initialized)
  // the comment below silences an error that doesn't matter.=
  useEffect(() => {
    fetchVals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [ currUser, setCurrUser ] = useState('')

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>

          {/* When clicking on profile have a global hook that gets set to currViewUser  */}

          {/* TODO: Add nav bar at top to have easy access to tabs??? 
          Probably Easiest to create react component then add to each view independently.
          May want to have 3 different nav bars for the different users and 
          check what type of user when loading and return different based on which type user is...Seems decently simple to implement */}

          {/* TODO: Integrate Material UI */}
          <Route path='/' element={<Base />} />

          {/* TODO: MAKE HOME NOT ACCESSABLE IF USER IS NOT LOGGED IN */}
          <Route path='/home' element={<HomeView username={currUser}/>} />

          {/* TODO: Make home page nicer and more professional. */}
          <Route path='/login' element={<LoginPage />} />
          
          {/* <Route path='/loggedIn' element={<LoggedIn />} /> */}
          {/* TODO: Classes tab */}
            {/* TODO: Go directly to "Classes display" with  */}
              {/* TODO: When logged in need to be able to view all classes */}
              {/* TODO: Currently Enrolled classes */}
            
          {/* TODO: View Profile (Probably later on) */}
          {/* TODO: Specific Classes (Probably later on) */}
          {/* TODO: Account Settings (Probably later on) */}
          
          
          
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/accounts/:accountId" element={<AccountInfo />} />
        </Routes>
      </BrowserRouter>

      {/* <header className="App-header">
        <button onClick={fetchBase} style={{marginBottom: '1rem'}}> {`GET: http://${url}:8000/`} </button>
        <button onClick={reset}> Reset DB </button>
        <form onSubmit={handleSubmit}>
          <input type="text" value={number} onChange={handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          { values.map((value, i) => <li key={i}>{value.value}</li>) }
        </ul>
      </header> */}
    </div>
  );
}

export default App;
