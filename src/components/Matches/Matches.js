import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ClimbrContext from '../../contexts/ClimbrContext'

import './Matches.css'

class Matches extends React.Component {
    static contextType = ClimbrContext

    renderMatches = () => {
        return this.context.usersMatched
            ? this.context.usersMatched.map(u => {
                const matchName = this.context.users.map(user => {
                    if (user.id === u.userMatchedId) {
                        return (
                            <div className='Match__name' key={u.id}>{user.name}</div>
                        )
                    } else {
                        return null
                    }
                })

                return (
                    <div className='Match' key={u.id}>
                        <Link to={`/chat?otherUserId=${u.userMatchedId}`}>{matchName}</Link>
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