import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import { CreateAccount, LoginPage } from "./login";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./home/HomePage";
import { Profile } from "./profile/Profile";
import { Messages } from "./messages/Messages";
import { Search } from "./search/Search";
import { Notifications } from "./notifications/Notifications";

// React functional component
function App () {
    return (
<div>
<Navbar/>
    <Routes>
      <Route exact path="/" element={<LoginPage/>} />
      <Route exact path="/create" element={<CreateAccount/>} />
      <Route exact path="/home" element={<HomePage/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/messages" element={<Messages/>} />
      <Route exact path="/search" element={<Search/>} />
      <Route exact path="/notifications" element={<Notifications/>} />
    </Routes>
</div>
    );
}

export default App;
