import Hero from "./Hero/Hero"
import About from "./About/About"
import React from 'react'
import FeaturedStartups from "./Featured/Featured"
import Features from "./Features/Features"
import Footer from "./Footer/Footer"
const Home = () => {
  return (
    <div><Hero/>
    <About/>
    <FeaturedStartups/>
    <Features/>
    <Footer/>
    </div>
  )
}

export default Home

