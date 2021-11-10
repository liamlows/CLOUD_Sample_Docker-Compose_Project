import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './components/Homepage'


const App = props => {
  return(
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App