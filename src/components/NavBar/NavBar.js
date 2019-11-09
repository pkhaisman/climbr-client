import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './NavBar.css'

class NavBar extends React.Component {
    handleLogoutClick = (e) => {
        TokenService.clearAuthToken()
        this.props.history.push('/login')
        this.props.updateUserLoggedIn(false)
    }

    render() {
        return TokenService.hasAuthToken() 
            ? <nav className='NavBar'>
                <ul className='NavBar__list'>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/swipe'}>Swipe</Link></li>
                    <li><Link to={'/match'}>Matches</Link></li>
                    <li><button onClick={(e) => this.handleLogoutClick(e)}>Log Out</button></li>
                </ul>
            </nav>
            : <nav className='NavBar'>
                <ul className='NavBar__list'>
                    <li><Link to={'/'}>Landing Page</Link></li>
                    <li><Link to={'/login'}>Log In</Link></li>
                    <li><Link to={'/signup'}>Sign Up</Link></li>
                </ul>
            </nav>
    }
}

export default withRouter(NavBar)