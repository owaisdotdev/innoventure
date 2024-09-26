import Hero from "./Hero/Hero"
import About from "./About/About"
import React from 'react'
import FeaturedStartups from "./Featured/Featured"

const Home = () => {
  return (
    <div><Hero/>
    <About/>
    <FeaturedStartups/>
    </div>
  )
}

export default Home

