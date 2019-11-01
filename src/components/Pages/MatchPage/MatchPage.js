import React from 'react'

import NavBar from '../../NavBar/NavBar'
import Matches from '../../Matches/Matches'

import './MatchPage.css'

function MatchPage() {
    return (
        <div className='MatchPage'>
            <NavBar />
            <Matches />
        </div>
    )
}

export default MatchPage