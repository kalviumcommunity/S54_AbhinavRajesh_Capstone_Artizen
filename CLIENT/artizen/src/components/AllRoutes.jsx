import React from 'react'
import Home from './Home'
import NoPage from './ErrorPage'
import { Route, Routes } from 'react-router-dom'
import '../index.css'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    </>
  )
}

export default AllRoutes