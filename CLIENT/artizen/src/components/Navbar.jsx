import React from 'react'
import logo from '../assets/logo.png';
import '../index.css'
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-icons'>
          <Link to='/discover' style={{display:'flex',alignItems:'center'}}>
            <button>Discover</button>
          </Link>
          <Link to='/creators' style={{display:'flex',alignItems:'center'}}>
          <button>Creators</button>
          </Link>
          <Link to='/testimonials' style={{display:'flex',alignItems:'center'}}>
          <button>Testimonials</button>
          </Link>
        </div>
        <div className='logo-div'>
          <Link to='/'>
          <img src={logo} alt="" className='logopic' />
          </Link>
        </div>
        <div className='space' style={{display:'flex',alignItems:'center'}}>
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