import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ClimbrContext from '../../contexts/ClimbrContext'

import './Matches.css'

class Matches extends React.Component {
    static contextType = ClimbrContext

    renderMatches = () => {
        return this.context.currentUser.usersMatched
            ? this.context.currentUser.usersMatched.map(matchId => {
                const matchName = this.context.users.map(user => {
                    if (user.id === matchId) {
                        return (
                            <div className='Match__name' key={matchId}>{user.firstName}</div>
                        )
                    } else {
                        return null
                    }
                })

                return (
                    <div className='Match' key={matchId}>
                        <Link to={`/chat?otherUserId=${matchId}`}>{matchName}</Link>
                    </div>
                )
            })
            : null
    }

    render() {
        return (
            <div className='Matches'>
                {this.renderMatches()}
            </div>
        )
    }
}

export default withRouter(Matches)