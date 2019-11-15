import React from 'react'
import NavBar from '../../NavBar/NavBar'
<<<<<<< HEAD
=======
import Hero from '../../Hero/Hero'
import Content from '../../Content/Content'
import Footer from '../../Footer/Footer'
>>>>>>> feature/upload-img
import './LandingPage.css'

function LandingPage() {
    return (
        <div className='LandingPage'>
            <NavBar />
<<<<<<< HEAD
            <h1>Find partners to climb with!</h1>
            <p>Click on the 'Swipe' link to swipe through users</p>
            <p>Click on the 'Match' link to see a list of users you have matched with</p>
            <p>Click on a match to open a chat with them</p>
            <p>Please Note: Chat it still under develpoment</p>
=======
            <Hero />
            <Content />
            <Footer />
>>>>>>> feature/upload-img
        </div>
    )
}

export default LandingPage