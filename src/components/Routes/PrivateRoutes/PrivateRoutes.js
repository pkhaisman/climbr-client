import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import ClimbrContext from '../../../contexts/ClimbrContext'
import ChatPage from '../../Pages/ChatPage/ChatPage'
import MatchPage from '../../Pages/MatchPage/MatchPage'
import SwipePage from '../../Pages/SwipePage/SwipePage'
import ProfilePage from '../../Pages/ProfilePage/ProfilePage'
import ApiService from '../../../services/api-service'

class PrivateRoutes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersLiked: [],
            currentUser: null,
            usersToSwipe: [],
            usersMatched: [],
        }
    }
    
    // QUESTION this feels sloppy. refactor ideas? how's my data structure?
    componentDidMount() {
        const userId = parseInt(sessionStorage.getItem('userId'))

        Promise.all([
            ApiService.getUsers(),
            ApiService.getUsersToSwipe(userId),
            ApiService.getUsersLiked(userId),
            ApiService.getUsersMatched(userId)
        ])
            .then(([ users, usersToSwipe, usersLiked, usersMatched ]) => {
                let currentUser, filteredUsers = [], usersLikedArr = []
                
                // set currentUser and filter currentUser out of users
                users.forEach(user => {
                    if (user.id !== userId) {
                        filteredUsers.push(user)
                    } else {
                        currentUser = user
                    }
                })

                // build array of user ids that current user has liked
                usersLiked.forEach(userLiked => {
                    if (currentUser.id === userLiked.userId) {
                        usersLikedArr.push(userLiked.userLikedId)
                    }
                })

                // filter usersToSwipe by usersLiked
                const filteredUsersToSwipe = usersToSwipe.filter(userToSwipe => {
                    return !usersLikedArr.includes(userToSwipe.userToSwipeId)
                })
                
                // if usersToSwipe doesnt exist then make post requests
                if (!filteredUsersToSwipe.length) {
                    filteredUsers.forEach(user => {
                        if (user.name && !usersLikedArr.includes(user.id)) {
                            ApiService.addUserToSwipe(userId, user.id)
                                .then((userToSwipe) => {
                                    this.addUserToSwipe(userToSwipe)
                                })
                        }
                    })
                }

                this.setState({
                    currentUser,
                    users: filteredUsers,
                    usersToSwipe: filteredUsersToSwipe,
                    usersLiked,
                    usersMatched,
                })
            })
    }

    handleSwipeLeft = (usersToSwipe, swipedUserId) => {
        // delete request
        ApiService.deleteUserToSwipe(this.state.currentUser.id, swipedUserId)
            .then(() => {
                this.setState({
                    usersToSwipe
                })
            })
    }
    
    handleSwipeRight = (swipedUserId, usersToSwipe) => {
        let { id } = this.state.currentUser
        let currentUserId = id

        Promise.all([
            ApiService.addUserLiked(currentUserId, swipedUserId),
            ApiService.deleteUserToSwipe(currentUserId, swipedUserId),
        ])
            .then(userLiked => {
                // QUESTION why is usersLiked an array?

                // build updated usersLiked array
                const usersLikedClone = [...this.state.usersLiked]
                const newUserLiked = {
                    id: userLiked[0].id,
                    userId: userLiked[0].userId,
                    userLikedId: userLiked[0].userLikedId,
                }
                
                usersLikedClone.push(newUserLiked)
                
                const usersLikeCurrentUser = []

                // build array of ids of users that like currentUser
                usersLikedClone.forEach(like => {
                    if (like.userLikedId === currentUserId) {
                        usersLikeCurrentUser.push(like.userId)
                    }
                })

                this.setState({
                    usersToSwipe,
                    usersLiked: usersLikedClone,
                })

                // check if the user that the currentUser swipes on is a match
                if (usersLikeCurrentUser.includes(swipedUserId)) {
                    ApiService.addUserMatched(swipedUserId, currentUserId)
                    return ApiService.addUserMatched(currentUserId, swipedUserId)
                } 
            })
            // TODO update state
            .then(userMatched => {
                if (userMatched) {
                    const usersMatchedClone = this.state.usersMatched.concat(userMatched)
    
                    this.setState({
                        usersMatched: usersMatchedClone
                    })
                }
            })
            .catch(error => console.log(error))
    }

    updateUser = (updatedUser) => {
        const currentUser = {
            ...this.state.currentUser,
            name: updatedUser.name,
            bio: updatedUser.bio
        }

        this.setState({
            currentUser
        })
    }

    addUserToSwipe = (userToSwipe) => {
        // if userToSwipe has already been liked, don't add to state
        this.setState({
            usersToSwipe: [
                ...this.state.usersToSwipe,
                userToSwipe
            ]
        })
    }

    render() {
        const contextValue = {
            users: this.state.users,
            usersLiked: this.state.usersLiked,
            currentUser: this.state.currentUser,
            usersToSwipe: this.state.usersToSwipe,
            usersMatched: this.state.usersMatched,

            handleSwipeLeft: this.handleSwipeLeft,
            handleSwipeRight: this.handleSwipeRight,
            updateUser: this.updateUser,
            addUserToSwipe: this.addUserToSwipe,
        }

        if (!this.state.currentUser) {
            return null
        }

        return (
            <div className='PrivateRoutes'>
                <ClimbrContext.Provider value={contextValue}>
                    <Route
                        path='/swipe'
                        // component={SwipePage}
                        render={() => <SwipePage updateUserLoggedIn={this.props.updateUserLoggedIn} />} />
                    <Route
                        path='/match'
                        // component={MatchPage}
                        render={() => <MatchPage updateUserLoggedIn={this.props.updateUserLoggedIn} />} />
                    <Route
                        path='/chat'
                        // component={ChatPage}
                        render={() => <ChatPage updateUserLoggedIn={this.props.updateUserLoggedIn} />} />
                    <Route
                        path='/profile'
                        // component={ProfilePage}
                        render={() => <ProfilePage updateUserLoggedIn={this.props.updateUserLoggedIn} />} />
                </ClimbrContext.Provider>
            </div>
        )
    }
}

export default withRouter(PrivateRoutes)