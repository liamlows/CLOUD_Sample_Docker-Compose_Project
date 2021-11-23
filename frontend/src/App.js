import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Homepage } from './components/Homepage';
import Login from './components/Login';
import NBA from './components/NBA';
import { Teamview } from './components/TeamView';


const App = props => {
  return(
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Homepage />}/>
        <Route path = "/home" element = {<Homepage />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/NBA" element = {<NBA />} />
        <Route path = "/TeamView" element = {<Teamview/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App