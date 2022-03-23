import './App.css'
import { LoggedIn } from './LoggedIn.jsx/LoggedIn';
import { LoginPage } from './Login/LoginPage';

export const App = () => {
    return<>
        <LoginPage/>
        <LoggedIn />
    </>;
}