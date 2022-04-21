import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
      
export const Navbar = () => {
  return (
    <>
      <div className= "nav">


      <div className="title"> <h1 className="setColor"> 
      <Link to='/home' className="nftLink">NFTShop</Link>
      </h1> </div>
        <div className="menu">
          <div className="navLink">
            <Link to='/profile'>My Account</Link>
          </div>
          <div className="navLink">
            <Link to='/messages'>Messages</Link>
          </div>
          <div className="navLink">
            <Link to='/search'>Search</Link>
          </div>
          <div className="navLink">
            <Link to='/notifications'>Notifications</Link>
          </div>
        </div>
            <Link to='/' className="navBtnLink">
              <button type="button" className="navBtn">
                Sign In
              </button>
            </Link>
      </div>
    </>
  );
};