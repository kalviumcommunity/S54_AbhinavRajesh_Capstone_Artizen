import React from 'react'
import logo from '../assets/logo.png';
import '../index.css'
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-icons'>
          <button>Discover</button>
          <button>Creators</button>
          <button>Testimonials</button>
        </div>
        <div className='logo-div'>
          <img src={logo} alt="" className='logopic' />
        </div>
        <div className='space'>
        <SignedOut>
          <SignInButton>
            <button style={{width:"8vw",
            height:"5vh",
            border: "none",
            fontSize: "1rem",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "700",
            cursor: "pointer",
            background: "none",
            color: "white",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "700",
            border:"1px solid white",
            borderRadius:"50px"}}>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
        <UserButton />
        </SignedIn>
        </div>
      </div>
  )
}

export default Navbar