import React from 'react'
import ClimbrContext from '../../contexts/ClimbrContext'
import { Card, CardWrapper } from 'react-swipeable-cards'
import './Cards.css'

class Cards extends React.Component {
    static contextType = ClimbrContext

    // remove card from cardsToSwipe
    onSwipeLeft(userSwiped) {
        const filteredCardsToSwipe = this.context.currentUser.cardsToSwipe
            .filter(id => id !== userSwiped.id)

        this.context.handleSwipeLeft(filteredCardsToSwipe)
    }

    // remove card from cardsToSwipe, add to usersLiked and check if match
    onSwipeRight(userSwiped) {
        const { currentUser, currentUser: { usersLiked, usersMatched }, users } = this.context

        const filteredCardsToSwipe = currentUser.cardsToSwipe
            .filter(id => id !== userSwiped.id)

        const updatedUsersLiked = usersLiked.concat(userSwiped.id)

        let updatedUsersMatched, updatedUsersMatchedSwipedUser, usersClone

        // if usersLiked of userSwiped includes id of currentUser then add respective ids to usersMatched of both users
        if (userSwiped.usersLiked.includes(currentUser.id)) {
            console.log('match')
            // add id of swipedUser to usersMatched of currentUser
            updatedUsersMatched = usersMatched.concat(userSwiped.id)

            // add id of currentUser to usersMatched of swipedUser
            updatedUsersMatchedSwipedUser = userSwiped.usersMatched.concat(currentUser.id)

            const updatedSwipedUser = {
                ...userSwiped,
                usersMatched: updatedUsersMatchedSwipedUser
            }

            usersClone = users
            const indexOfUserToUpdate = usersClone.findIndex(user => user.id === userSwiped.id)
            usersClone[indexOfUserToUpdate] = updatedSwipedUser
        }

        this.context.handleSwipeRight(filteredCardsToSwipe, updatedUsersLiked, updatedUsersMatched || usersMatched, usersClone || users)
    }

    renderCards = () => {
        return this.context.users
            .filter(user => user.id !== this.context.currentUser.id)
            .map(u => {
                return (
                    <Card
                        key={u.id}
                        data={u}
                        onSwipeLeft={this.onSwipeLeft.bind(this)}
                        onSwipeRight={this.onSwipeRight.bind(this)}>
                            {u.firstName}
                    </Card>
                )
            })
    }

    render() {
        return (
            <CardWrapper>
                {this.renderCards()}
            </CardWrapper>
        )
    }
}

export default Cards