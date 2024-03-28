import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const NoPage = () => {
  return (
    <div className='error--page' >
      <h1>404</h1>
      <h3>OOPs! PAGE NOT BE FOUND</h3>
      <Link to="/"> <button>Back to Home</button> </Link>
    </div>
  )
}

export default NoPage