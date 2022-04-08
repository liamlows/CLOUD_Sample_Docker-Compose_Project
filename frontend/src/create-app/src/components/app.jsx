import { Login } from './pages/login-register.jsx'
import { Layout } from './pages/layout.jsx'
import { useEffect, useState } from "react";
import React from 'react';

export var account = {username:'', password:''};
var screen = 2;

export function getAccount(){
  return account;
}

export function setAccount(value){
  account = value;
}

export function getScreen(){
  return screen;
}

export const App = () => {
  console.log(account);
  return <>
    <Layout />
    {screen == 2 && <Login />}
  </>;
}
