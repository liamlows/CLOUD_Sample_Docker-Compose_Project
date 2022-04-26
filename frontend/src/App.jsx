import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import { CreateAccount, LoginPage } from "./login";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./home/HomePage";
import { Profile } from "./profile/Profile";
import { Messages } from "./messages/Messages";
import { Search } from "./search/Search";
import { Notifications } from "./notifications/Notifications";
import { EditProfile } from './profile/EditProfile';
import { NFTDetail} from'./home/NFTDetail';
import { Followers } from './profile/Followers';
import { Following } from './profile/Following';
import { ChangePassword } from './profile/ChangePassword';
import { NewPost } from './profile/NewPost';

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
      <Route exact path="/edit-profile" element={<EditProfile/>} />
      <Route exact path="/NFT-details" element={<NFTDetail/>}/>
      <Route exact path="/followers" element={<Followers/>} />
      <Route exact path="/following" element={<Following/>} />
      <Route exact path="/changePw" element={<ChangePassword/>} />
      <Route exact path="/postPicture" element={<NewPost/>} />
    </Routes>
</div>
    );
}

export default App;