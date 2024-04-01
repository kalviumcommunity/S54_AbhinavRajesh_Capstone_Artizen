import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../index.css';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (windowWidth < 1200) {
      document.body.classList.toggle('no-scroll');
      document.querySelector('.blur-overlay').classList.toggle('active'); 
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1200) {
        setShowMenu(false); 
        document.body.classList.remove('no-scroll'); 
        document.querySelector('.blur-overlay').classList.remove('active'); 
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='navbar'>
      {windowWidth < 1200 && (
        <button className="hamburger-menu" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      )}

      <div className="blur-overlay"></div>

      {(showMenu || windowWidth >= 1200) && (
        <div className='nav-icons' style={{ display: windowWidth >= 1200 || showMenu ? 'flex' : 'none' }}>
          <Link to='/discover' style={{ display: 'flex', alignItems: 'center' }}>
            <button>Discover</button>
          </Link>
          <Link to='/creators' style={{ display: 'flex', alignItems: 'center' }}>
            <button>Creators</button>
          </Link>
          <Link to='/testimonials' style={{ display: 'flex', alignItems: 'center' }}>
            <button>Testimonials</button>
          </Link>
        </div>
      )}

      <div className='logo-div'>
        <Link to='/'>
          <img src={logo} alt="" className='logopic' />
        </Link>
      </div>

      <div className='space' style={{ display: 'flex', alignItems: 'center' }}>
        <SignedOut>
          <SignInButton>
            <button className='clerk-btn' style={{
              margin:'0 20px',
              marginLeft: '40px',
              width: "100px",
              height: "40px",
              border: "none",
              fontSize: "1rem",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "700",
              cursor: "pointer",
              background: "none",
              color: "white",
              border: "1px solid white",
              borderRadius: "50px"
            }}>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar;
