import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from '../../Pages/LoginPage/LoginPage'
import SignUpPage from '../../Pages/SignUpPage/SignUpPage'
import LandingPage from '../../Pages/LandingPage/LandingPage'

class PublicRoutes extends React.Component {
    render() {
        return (
            <div className='PublicRoutes'>
                <Route
                    path='/'
                    exact
                    component={LandingPage} />
                <Route
                    path='/signup'
                    component={SignUpPage} />
                <Route
                    path='/login'
                    render={() => <LoginPage updateUserLoggedIn={this.props.updateUserLoggedIn} />} />
            </div>
        )
    }
}

export default PublicRoutes