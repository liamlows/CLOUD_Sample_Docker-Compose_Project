import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { CreateAccount, LoginPage } from "./login";

// React functional component
function App () {
    return (
      <div className="App">
        <Nav/>
        
    <Switch>
      <Route exact path="/login/LoginPage">
        <LoginPage/>
      </Route>
      <Route exact path="/login/CreateAccount">
        <CreateAccount/>
      </Route>
    </Switch>
    </div>
    );
}

export default App;
