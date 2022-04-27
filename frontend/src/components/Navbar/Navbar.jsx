import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import{ getUserInfo } from '../../api/AuthenAPI';
import{ useState,useEffect } from 'react';
      
export const Navbar = () => {

  // const [user, setUser]=useState(undefined);

  // useEffect(()=>{
  //     getUserInfo().then(x => setUser(x));

  // },[ ]);
  // if(!user){
  //   return<>lOADING</>
  // }

  return (
    <>
      <div className= "nav">

      <div className="title"> <h1 className="setColor"> 
      <Link to='/home' className="nftLink">NFTShop</Link>
      </h1>  </div>
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
            <Link to='/rankings'>Rankings</Link>
          </div>
          <div className="navLink">
            <Link to='/notifications'>Notifications</Link>
          </div>
          <h5 className="navBalance">
            {/* Balance: ${user[0].balance} */}
          </h5>
          <Link to='/' className="navBtnLink">
              <button type="button" className="navBtn">
                Sign In
              </button>
            </Link>
        </div>
      </div>
    </>
  );
};