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
import Cookies from 'js-cookie';
import { getAccountbyUsername } from './APIFolder/loginApi';
import { UserSearch } from './Components/Profiles/UserSearch';
import { FriendsList } from './Components/Profiles/FriendsList';

// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    let username = Cookies.get("username");

    if (username) {
      getAccountbyUsername(username)
        .then(account => {
          if (account) {
            setCurrUser(account);
          }
          else {
            console.log("User is null after request");
            setCurrUser('');
          }
          setCName(' ');
        })
    }
    else {
      setCurrUser('');
      setCName(' ');
    }
  }, [])

  const [currUser, setCurrUser] = useState('')
  const [cName, setCName ] = useState('dn');

  //using to alert when navigated back to home page ( for when not signed in as user)
  const [ navigated, setNavigated] = useState(false);


  //Nav bar now made available from all views (at least thats the goal)
  const [loggedInPages] = useState([
    { label: 'Dashboard', route: `/` },
    { label: 'Classes', route: `/classes` },
    { label: 'Friends', route: `/users/:username/friends` },
  ]);
  const [basePages] = useState([
    { label: 'Info', route: `/info` },
    //Add more paths here if you want more?
  ]);
  const [settings] = useState([
    // {label: 'Public Profile', route: `/users/${account.id}` }, Keep out until have an account id confirmed
    // { label: 'Account', route: `/accounts/${account.id}` }, 
    { label: 'Public Profile', route: `/users` },
    { label: 'Account', route: `/accounts` },
    { label: 'Logout', route: '/signout' }
  ]);

  //Turns out im dumb and should have done this while loading all along
  return (
    <div className={`App ${cName}`} >
      <BrowserRouter>
        <Routes>

          {/* When clicking on profile have a global hook that gets set to currViewUser  */}

          {/* TODO: Add nav bar at top to have easy access to tabs??? 
          Probably Easiest to create react component then add to each view independently.
          May want to have 3 different nav bars for the different users and 
          check what type of user when loading and return different based on which type user is...Seems decently simple to implement */}

          {/* TODO: Integrate Material UI */}
          <Route path='/' element={<Base 
            currUser={currUser}
            setCurrUser={x => setCurrUser(x)}
            basePages={basePages}
            loggedInPages={loggedInPages}
            settings={settings} 
            navigated={navigated}/>} />

          {/* TODO: MAKE HOME NOT ACCESSABLE IF USER IS NOT LOGGED IN */}

          {/* TODO: Make home page nicer and more professional. */}
          <Route path='/login' element={<LoginPage 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)} />} />

          {/* <Route path='/loggedIn' element={<LoggedIn />} /> */}
          {/* TODO: Classes tab */}
          {/* TODO: Go directly to "Classes display" with  */}
          {/* TODO: When logged in need to be able to view all classes */}
          {/* TODO: Currently Enrolled classes */}

          {/* TODO: View Profile (Probably later on) */}
          {/* TODO: Specific Classes (Probably later on) */}
          {/* TODO: Account Settings (Probably later on) */}


          <Route path="/users/:username/friends" element={<FriendsList 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)}
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />

          <Route path="/users" element={<UserSearch 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)}
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />

          <Route path='/signUp' element={<SignUpPage 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)} />} />

          <Route path="/users/:username" element={<Profile 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)}
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />
            
          <Route path="/accounts/:username" element={<AccountInfo 
            currUser={currUser} 
            setCurrUser={x => setCurrUser(x)}
            setNavigated={x => setNavigated(x)} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
