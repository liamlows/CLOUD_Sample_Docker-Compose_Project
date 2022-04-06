import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate
} from "react-router-dom";

import axios from 'axios';
import { NavBar } from './Components/NavBar/NavBar';
import { Home } from './Components/Home/Home';
import { Feed } from './Components/Feed/Feed';
import Login from './Components/Login/Login';
import FarmPage from './Components/FarmPage/FarmPage';
import { UserContext } from './Components/userContext';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { SignUp } from './Components/SignUp/SignUp';

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const[user,setUser]=useState({user: "token"});

  const logout=()=>{
    console.log("logout");
  }
  useEffect(() => {

    // let use = window.localStorage.getItem("userData");

    // if(uer){
    //   setUser({userData: user, logout: logout});
    // }

  },[])

  return (
    <UserContext.Provider value={user}>
      <Router>
              <NavBar />
              <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                  <Route path='/feed' element={<ProtectedRoute/>}>
                      <Route path="/feed" element={<Feed/>}/>
                  </Route>
                  <Route path='/farm/:id' element={<ProtectedRoute/>}>
                    <Route path='/farm/:id' element={<FarmPage/>}/>
                  </Route>
                  <Route path='*' element={<Navigate to="/" replace />}/>
              </Routes>
        </Router>
    </UserContext.Provider>
  )
}

export default App;
