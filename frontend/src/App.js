
// Library Imports
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

// Component Imports
import './App.css';
import { SignUpPage } from './Components/Login/SignUpPage';
import { LoginPage } from './Components/Login/LoginPage';
import { Base } from './Components/BaseView/Base';
import { Profile } from './Components/Profiles/Profile';
import { AccountInfo } from './Components/Profiles/AccountInfo';
import { UserSearch } from './Components/Profiles/UserSearch';
import { FriendsList } from './Components/Profiles/FriendsList';

// Method Imports
import { getAccountbyUsername } from './APIFolder/loginApi';

// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // Component Variables
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

  // Initial Load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    localStorage.setItem("currUser", "{}");

    let username = Cookies.get("username");

    if (username) {
      setNavigated(false);
      getAccountbyUsername(username)
        .then(account => {
          if (account) {
            console.log("account found");
            console.log(account);
            localStorage.setItem("currUser", JSON.stringify(account));
          }
          else {
            console.log("User is null after request");
            localStorage.setItem("currUser", "{}");
          }
          setCName(' ');
        })
    }
    else {
      console.log("No cookie");
      localStorage.setItem("currUser", "{}");
      setCName(' ');
    }
  }, []);

  // Conditions

  // Component Methods

  // HTML
  return (
    <div className={`App ${cName}`} >
      <BrowserRouter>
        <Routes>
          {/* TODO: Add nav bar at top to have easy access to tabs??? 
          Probably Easiest to create react component then add to each view independently.
          May want to have 3 different nav bars for the different users and 
          check what type of user when loading and return different based on which type user is...Seems decently simple to implement */}

          {/* TODO: Integrate Material UI */}
          <Route path='/' element={<Base 
            basePages={basePages}
            loggedInPages={loggedInPages}
            settings={settings} 
            navigated={navigated}/>} />

          {/* TODO: Make home page nicer and more professional. */}
          <Route path='/login' element={<LoginPage 
            setNavigated={x => setNavigated(x)}/>} />

          {/* <Route path='/loggedIn' element={<LoggedIn />} /> */}
          {/* TODO: Classes tab */}
          {/* TODO: Go directly to "Classes display" with  */}
          {/* TODO: When logged in need to be able to view all classes */}
          {/* TODO: Currently Enrolled classes */}

          {/* TODO: View Profile (Probably later on) */}
          {/* TODO: Specific Classes (Probably later on) */}
          {/* TODO: Account Settings (Probably later on) */}


          <Route path="/users/:username/friends" element={<FriendsList 
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />

          <Route path="/users" element={<UserSearch 
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />

          <Route path='/signUp' element={<SignUpPage 
            setNavigated={x => setNavigated(x)}/>} />

          <Route path="/users/:username" element={<Profile 
            pages={loggedInPages}
            settings={settings}
            setNavigated={x => setNavigated(x)}/>} />
            
          <Route path="/accounts/:username" element={<AccountInfo 
            setNavigated={x => setNavigated(x)} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
