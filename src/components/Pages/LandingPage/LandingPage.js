import React from 'react'
import NavBar from '../../NavBar/NavBar'
import './LandingPage.css'

function LandingPage() {
    return (
        <div className='LandingPage'>
            <NavBar />
            <h1>Find partners to climb with!</h1>
            <ul>
                <h2>Demo Login Info</h2>
                <li>username: demo@gmail.com</li>
                <li>password: mpass</li>
            </ul>
            <p>Click on the 'Swipe' link to swipe through users</p>
            <p>Click on the 'Match' link to see a list of users you have matched with. For the demo account every user has already liked you so any user you swipe right on, you will match with</p>
            <p>Click on a match to open a chat with them</p>
        </div>
    )
}

export default LandingPage