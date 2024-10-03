import Hero from "./Hero/Hero"
import About from "./About/About"
import React from 'react'
import FeaturedStartups from "./Featured/Featured"
import Features from "./Features/Features"

const Home = () => {
  return (
    <div><Hero/>
    <About/>
    <FeaturedStartups/>
    <Features/>
    </div>
  )
}

export default Home

