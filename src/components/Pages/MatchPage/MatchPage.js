import React from 'react'

import NavBar from '../../NavBar/NavBar'
import Matches from '../../Matches/Matches'

import './MatchPage.css'

function MatchPage(props) {
    return (
        <div className='MatchPage'>
            <NavBar updateUserLoggedIn={props.updateUserLoggedIn} />
            <Matches />
        </div>
    )
}

export default MatchPage