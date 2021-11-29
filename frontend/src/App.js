import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar"
import DefaultApp from './defaultApp/defaultApp';
import Trainers from './Trainers/Trainers'
import Dashboard from './Dashboard/Dashboard';
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={DefaultApp} />
                    <Route path='/Trainers' component={Trainers} />
                    <Route path='/DefaultApp' component={DefaultApp} />
                    <Route path='/Dashboard' component={Dashboard} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;