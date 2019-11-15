import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../../Pages/LoginPage/LoginPage'
import SignUpPage from '../../Pages/SignUpPage/SignUpPage'
import LandingPage from '../../Pages/LandingPage/LandingPage'
import NotFoundPage from '../../Pages/NotFoundPage/NotFoundPage'

class PublicRoutes extends React.Component {
    render() {
        return (
            <div className='PublicRoutes'>
                <Switch>
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
                    <Route
                        component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}

export default PublicRoutes