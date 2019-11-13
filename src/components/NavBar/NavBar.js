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
                    <li><Link className='Navbar__list__title' to={'/'}><h1>Climbr</h1></Link></li>
                    <div className='NavBar__list--right'>
                        <li><Link className='NavBar__list__login' to={'/login'}>Log In</Link></li>
                        <li><Link className='NavBar__list__signup' to={'/signup'}>Sign Up</Link></li>
                    </div>
                </ul>
            </nav>
    }
}

export default withRouter(NavBar)