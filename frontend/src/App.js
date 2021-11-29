import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Homepage } from './components/Homepage';
import Login from './components/Login';
import LeaguePage from './components/LeaguePage';
import { Teamview } from './components/TeamView';
import { GameView } from './components/GameView';

const App = props => {
  return(
    <div className="App">
    <Router>
    <Switch>
        <Route exact path = "/" ><Homepage /></Route>
        <Route path = "/home" ><Homepage /></Route>
        <Route path = "/login"><Login /></Route>
        <Route path = "/NBA" ><LeaguePage league = "NBA" /></Route>
        <Route path = "/NFL" ><LeaguePage league = "NFL"/></Route>
        <Route path = "/MLB" ><LeaguePage league = "MLB"/></Route>

        <Route path="/TeamView/:teamID" component={Teamview}/>
        <Route path="/GameView/:gameID" component={GameView}/>
    </Switch>
    </Router>
    </div>
  )
}

export default App