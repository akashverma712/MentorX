import React from 'react'
import './App.css'
import Landing from "./Pages/LandingPage"
import CareerPath from './Pages/CareerPath'
import CareerSimulator from './Pages/CareerSimulator'
import ExpertMentorship from './Pages/ExpertMentorship'
import CareerResources from './Pages/CareerResources'
import Footer from './Components/ui/button/Footer'


function App() {

  return (
    <>
    <Landing />
    <CareerPath/>
    <CareerSimulator/>
    <ExpertMentorship/>
    <CareerResources/>
    <Footer/>
    </>
  )
}

export default App
