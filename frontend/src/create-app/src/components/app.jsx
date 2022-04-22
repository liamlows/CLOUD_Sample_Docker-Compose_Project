import { Login } from './pages/login-register.jsx';
import { Layout } from './pages/layout.jsx';
import { Main } from './pages/main.jsx';
import { Product } from './pages/product.jsx';
import { CreatePost } from './pages/createPost.jsx';
import { useEffect, useState } from "react";
import React from 'react';

export const App = () => {
  const [ account, setAccount ] = useState(true);
  const [ screen, setScreen ] = useState(4);
  function setScreenValue(value){
    setScreen(value);
  }
  function setAccountValue(value){
    setAccount(value);
  }
  return <>
    <Layout account = {account} screen={screen} setScreen={setScreenValue}/>
    {screen == 1 && <Main setScreen = {setScreenValue}/>}
    {screen == 2 && <Login setAccount={setAccountValue} setScreen={setScreenValue}/>}
    {screen == 3 && <Product/>}
    {screen == 4 && <CreatePost/>}
  </>;
}
