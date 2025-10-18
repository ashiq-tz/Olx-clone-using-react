import React from 'react'
import Home from './Components/Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './Components/Details/Details'
import MyAds from './Components/Pages/MyAds'

const App = () => {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='/myads' element={<MyAds />} />
     
    </Routes>
   </>
  )
}

export default App
