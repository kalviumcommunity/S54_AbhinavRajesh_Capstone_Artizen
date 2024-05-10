import React from 'react'
import Home from './Home'
import NoPage from './ErrorPage'
import { Route, Routes } from 'react-router-dom'
import '../index.css'
import Creators from './Creators'
import Testimonials from './Testimonials'
import { useClerk } from '@clerk/clerk-react'
import Profile from './Profile'
import Forums from './Forums'
import DiscoverCategories from './DiscoverCategories'
import ArtworkGrid from './Discover'



const AllRoutes = () => {

  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path='/discovercat' element={ <DiscoverCategories />} />
            <Route path='/discover' element={ <ArtworkGrid />} />
            <Route path='/creators' element={<Creators />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forums' element={<Forums />}/>
        </Routes>
    </>
  )
}

export default AllRoutes