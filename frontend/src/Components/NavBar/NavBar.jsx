import './NavBar.css';
import { Link } from 'react-router-dom';
export const NavBar = () =>{
    
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/'className="navbar-brand" >
            Farm Finders
        </Link>
        <div  class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=''>
                <li className="nav-item">
                    <Link to='/farms' className='nav-link'> Farms </Link>
                </li>
                <li className="nav-item">
                    <Link to='/login' className='nav-link'> login </Link>
                </li>
            </ul>
        </div>

    </nav>
    )
}