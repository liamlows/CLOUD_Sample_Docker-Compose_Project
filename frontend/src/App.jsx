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
import {DM} from "./messages/DM";
import { Compose } from "./messages/Compose"
import { ExampleUser } from './profile/ExampleUser';
import { Transactions } from './profile/Transactions';
import { Rankings } from './rankings/Rankings';

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
      <Route exact path="/edit-profile/:id" element={<EditProfile/>} />
      <Route exact path="/NFT-details/:id" element={<NFTDetail/>}/>
      <Route exact path="/followers" element={<Followers/>} />
      <Route exact path="/following" element={<Following/>} />
      <Route exact path="/changePw" element={<ChangePassword/>} />
      <Route exact path="/postPicture" element={<NewPost/>} />
      <Route exact path="/thatMessage" element={<DM/>} />
      <Route exact path="/newMessage" element={<Compose/>} />
      <Route exact path="/theirUser" element={<ExampleUser/>}/>
      <Route exact path="/transaction" element={<Transactions/>}/>
      <Route exact path="/rankings" element={<Rankings/>}/>

    </Routes>
</div>
    );
}

export default App;