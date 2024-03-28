import React from 'react'
import Home from './Home'
import NoPage from './ErrorPage'
import { Route, Routes } from 'react-router-dom'
import '../index.css'
import Login from './Login'
const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    </>
  )
}

export default AllRoutes