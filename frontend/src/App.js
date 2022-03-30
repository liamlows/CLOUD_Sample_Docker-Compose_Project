import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import axios from 'axios';
import { NavBar } from './Components/NavBar/NavBar';
import { Home } from './Components/Home/Home';
import Login from './Components/Login/Login';
import FarmPage from './Components/FarmPage/FarmPage';
import { AccountEditor } from './account/AccountEditor';
// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  return (
    <Router>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/Farm/:id" element={<FarmPage/>}/>
            </Routes>
        </Router>
  )
}

export default App;
