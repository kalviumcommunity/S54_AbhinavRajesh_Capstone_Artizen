import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import AllRoutes from './components/AllRoutes'
import './index.css'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
     <ToastContainer /> 
    <Navbar />
    <AllRoutes />
    </>
  )
}

export default App