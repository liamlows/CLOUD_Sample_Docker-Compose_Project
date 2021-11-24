import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Homepage } from './components/Homepage';
import Login from './components/Login';
import LeaguePage from './components/LeaguePage';

const App = props => {
  return(
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Homepage />}/>
        <Route path = "/home" element = {<Homepage />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/NBA" element = {<LeaguePage league = "NBA" />} />
        <Route path = "/NFL" element = {<LeaguePage league = "NFL"/>} />
        <Route path = "/MLB" element = {<LeaguePage league = "MLB"/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App