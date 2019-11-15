import React from 'react'
import ClimbrContext from '../../contexts/ClimbrContext'
import { Card, CardWrapper } from 'react-swipeable-cards'
import PropTypes from 'prop-types'
import ApiService from '../../services/api-service'
import './Cards.css'

class EndCard extends React.Component {
    static contextType = ClimbrContext

    // TODO REFACTOR
    refreshUsersToSwipe = () => {
        const idsUsers = []

        this.context.users.forEach(user => {
            if (user.id !== this.context.currentUser.id) {
                idsUsers.push(user.id)
            }
        })

        const idsLikedUsers = []

        this.context.usersLiked.forEach(userLiked => {
            if (this.context.currentUser.id === userLiked.userId) {
                idsLikedUsers.push(userLiked.userLikedId)
            }
        })

        const idsUsersToSwipe = idsUsers.filter(id => !idsLikedUsers.includes(id))

        idsUsersToSwipe.forEach(id => {
            ApiService.addUserToSwipe(this.context.currentUser.id, id)
                .then((userToSwipe) => {
                    // add userToSwipe to state
                    this.context.addUserToSwipe(userToSwipe)
                })
        })
    }

    render() {
        return(
            <div className='EndCard'>
                <p className='EndCard__text'>You swiped through all the cards! Click to refresh the stack!</p>
                <button className='EndCard__btn' onClick={() => this.refreshUsersToSwipe()}>Refresh</button>
            </div>
        );
    }
}

class Cards extends React.Component {
    static contextType = ClimbrContext

    // remove user from usersToSwipe
    onSwipeLeft(idUserSwiped) {
        const filteredUsersToSwipe = this.context.usersToSwipe
            .filter(user => user.userToSwipeId !== idUserSwiped)

        this.context.handleSwipeLeft(filteredUsersToSwipe, idUserSwiped)
    }

    // remove user from usersToSwipe
    onSwipeRight(idUserSwiped) {
        const filteredUsersToSwipe = this.context.usersToSwipe
            .filter(user => user.userToSwipeId !== idUserSwiped)
        
        this.context.handleSwipeRight(idUserSwiped, filteredUsersToSwipe)
    }

    renderCards = () => {
        const cardStyle = {
            overflow: 'auto',
            color: 'red',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateY(-35px)',
            color: 'black',
            boxShadow: '0 2px 10px 0 rgba(117,117,117,0.77)'
        }

        return this.context.usersToSwipe
            .map(u => {
                const user = this.context.users.find(user => user.id === u.userToSwipeId)
                return (
                    <Card
                        style={cardStyle}
                        key={u.id}
                        data={u}
                        onSwipeLeft={(u) => this.onSwipeLeft(u.userToSwipeId)}
                        onSwipeRight={(u) => this.onSwipeRight(u.userToSwipeId)}>
                            <img className='Card__user-img' src={user.image} alt='Profile pic' />
                            <p className='Card__name'>{user.name}</p>
                            <hr style={{
                                      border: 0,
                                      clear: 'both',
                                      display: 'block',
                                      width: '96%',              
                                      backgroundColor: '#e8e8e8',
                                      height: '1px',
                                }} /> 
                            <p className='Card__bio'>{user.bio}</p>
                    </Card>
                )
            })
    }

    getEndCard = () => {
        return  (
            <EndCard />
        )
    }

    render() {
        return (
            <CardWrapper addEndCard={() => this.getEndCard()}>
                {this.renderCards()}
            </CardWrapper>
        )
    }
}

// needed for component smoke test to pass
Cards.contextTypes = {
    usersToSwipe: PropTypes.array,
    users: PropTypes.array,
}

export default Cards