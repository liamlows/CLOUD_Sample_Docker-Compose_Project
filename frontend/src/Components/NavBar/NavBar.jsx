import './NavBar.css';
import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaBars, FaShoppingCart, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { NavbarItems } from './NavbarItems';
export const NavBar = () =>{
    const[showSidebar, setShowSidebar] = useState(false);
    const[isSignedIn, setIsSignedIn] = useState(true);
    const location = useLocation();

  const logout=()=>{
    console.log("todo");
  }
  const toggleSidebar = () => {
    setShowSidebar((prevState)=>!prevState);
  }
    return(
        <nav className='navbar'>
            <Link to='/'>
                <FaUserAlt/>
            </Link>
            <FaBars id="navbar-bars" onClick={()=>{toggleSidebar()}}/>
            
            <ul className='navbar-menu'>
            
            {
                NavbarItems.map((item,index)=>{
                return (
                    <li key={index} class="navbar-item">
                    <Link to={item.path} className={location.pathname == item.path ? "active":""}>
                        {item.title}
                    </Link>
                    </li>
                )
                })
            }
            </ul>
            <div className='navbar-signin-container'>
                <Link to='/login' className='navbar-signin'>Sign In or Create an account</Link>
            </div>
            
            <Link to='/profile' className='navbar-icon-and-text'> 
                <FaUserAlt/>
                <p>My Head to Vegas</p> 
            </Link>
            
            <Link to='/cart' className='navbar-icon-and-text'> 
                <FaShoppingCart/>
                <p>Cart</p> 
            </Link>

            { showSidebar ? 
        <div className="navbar-mobile">
          <ul id='navbar-mobile-list'>
            <li id='navbar-mobile-close'>
              <AiOutlineClose  onClick={()=>{toggleSidebar()}}/>
            </li>

              <li id="navbar-mobile-pages">
                {
                  NavbarItems.map((item,index)=>{
                    return (
                      <li key={index} class="navbar-mobile-item">
                        <Link to={item.path} className={location.pathname == item.path ? "active":""}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })
                }
              </li>
              {
                isSignedIn ?  <li id='navbar-mobile-user-items'>
                                <li className='navbar-mobile-item'>
                                  <Link to={'/cart'}>
                                    <FaShoppingCart/>
                                    <span>My Cart</span>
                                  </Link>
                                </li> 
                                <li className='navbar-mobile-item'>
                                  <Link to={'/profile'}>
                                    <FaUserAlt/>
                                    <span>My profile</span>
                                  </Link>
                                </li> 
                                <li className='navbar-mobile-item' onClick={()=>logout()}>
                                  <Link to={'/'}>
                                    <FaSignInAlt/>
                                    <span>Logout</span>
                                  </Link>
                                </li> 
                              </li> 
                              :
                              <li className='navbar-mobile-item'>
                                <Link to={'/login'}>
                                  <FaSignInAlt/>
                                  <span>Login/Register</span>
                                </Link>
                              </li>
                              

              }
          </ul>
        </div> : null
      }
      </nav>
    )
}