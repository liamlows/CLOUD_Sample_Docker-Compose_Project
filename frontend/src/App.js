import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Homepage } from './components/Homepage';
import Login from './components/Login';


const App = props => {
  return(
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Homepage />}/>
        <Route path = "/login" element = {<Login />}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App