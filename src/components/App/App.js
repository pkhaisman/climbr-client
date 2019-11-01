import React                        from 'react'
import { Route, BrowserRouter }     from 'react-router-dom'

import DataHelpers from '../../data/data'

import ClimbrContext from '../../contexts/ClimbrContext'

import ChatPage                     from '../Pages/ChatPage/ChatPage'
import MatchPage                    from '../Pages/MatchPage/MatchPage'
import SwipePage                    from '../Pages/SwipePage/SwipePage'
import LoginPage                    from '../Pages/LoginPage/LoginPage'
import SignUpPage                   from '../Pages/SignUpPage/SignUpPage'
import LandingPage                  from '../Pages/LandingPage/LandingPage'
import ProfilePage                  from '../Pages/ProfilePage/ProfilePage'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: '',
            users: []
        }
    }

    componentDidMount() {
        const users = DataHelpers.generateUsers()
        const currentUser = users[0]

        this.setState({
            users,
            currentUser
        })
    }

    handleSwipeLeft = (cardsToSwipe) => {
        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                cardsToSwipe
            }
        }))
    }

    handleSwipeRight = (cardsToSwipe, usersLiked, usersMatched, usersClone) => {
        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                cardsToSwipe,
                usersLiked,
                usersMatched,
            },
            users: usersClone
        }))
    }

    handleMockUserLogin = (user) => {
        // let userId
        // let otherUserId

        // if (user.id === 0) {
        //     userId = '0'
        //     otherUserId = '1'
        // } else {
        //     userId = '1'
        //     otherUserId = '0'
        // }

        // window.location.href = `/chat?userId=${userId}&otherUserId=${otherUserId}`;

        this.setState({
            currentUser: {
                ...user
            }
        })
    }

    render() {
        const contextValue = {
            users: this.state.users,
            currentUser: this.state.currentUser,
            handleSwipeLeft: this.handleSwipeLeft,
            handleSwipeRight: this.handleSwipeRight,
            handleMockUserLogin: this.handleMockUserLogin
        }

        if (!this.state.users) {
            return null
        }
        
        return (
            <BrowserRouter>
                <main className='App'>
                    <ClimbrContext.Provider value={contextValue}>
                        <Route
                            path='/'
                            exact
                            component={LandingPage} />
                        <Route
                            path='/signup'
                            component={SignUpPage} />
                        <Route
                            path='/login'
                            component={LoginPage} />
                        <Route
                            path='/swipe'
                            component={SwipePage} />
                        <Route
                            path='/match'
                            component={MatchPage} />
                        <Route
                            path='/chat'
                            component={ChatPage} />
                        <Route
                            path='/profile'
                            component={ProfilePage} />
                    </ClimbrContext.Provider>
                </main>
            </BrowserRouter>
        )
    }
}

export default App