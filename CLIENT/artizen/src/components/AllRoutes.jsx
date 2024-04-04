import React from 'react'
import Home from './Home'
import NoPage from './ErrorPage'
import { Route, Routes } from 'react-router-dom'
import '../index.css'
import Discover from './Discover'
import Creators from './Creators'
import Testimonials from './Testimonials'
import { useClerk } from '@clerk/clerk-react'



const AllRoutes = () => {


  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path='/discover' element={ <Discover />} />
            <Route path='/creators' element={<Creators />} />
            <Route path='/testimonials' element={<Testimonials />} />
        </Routes>
    </>
  )
}

export default AllRoutes