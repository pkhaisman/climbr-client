import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Hero from '../../Hero/Hero'
import Content from '../../Content/Content'
import Footer from '../../Footer/Footer'
import './LandingPage.css'

function LandingPage() {
    return (
        <div className='LandingPage'>
            <NavBar />
            <Hero />
            <Content />
            <Footer />
        </div>
    )
}

export default LandingPage