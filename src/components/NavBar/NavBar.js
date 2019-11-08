import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './NavBar.css'

class NavBar extends React.Component {
    renderLoginLink = () => {
        return (
            <li>
                <Link to={'/login'}>
                    Log In
                </Link>
            </li>
        )
    }

    handleLogoutClick = (e) => {
        TokenService.clearAuthToken()
        this.props.history.push('/login')
        this.props.updateUserLoggedIn(false)
    }

    renderLogoutLink = () => {
        return (
            // <li>
            //     <Link to={'/'} onClick={(e) => this.handleLogoutClick(e)}>
            //         Log Out
            //     </Link>
            // </li>
            <li>
                <button onClick={(e) => this.handleLogoutClick(e)}>
                    Log Out
                </button>
            </li>
        )
    }

    renderLoginOrLogout = () => {
        return TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()
    }

    render() {
        return (
            <nav className='NavBar'>
                <ul className='NavBar__list'>
                    <li><Link to={'/signup'}>Sign Up</Link></li>
                    {this.renderLoginOrLogout()}
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/swipe'}>Swipe</Link></li>
                    <li><Link to={'/match'}>Matches</Link></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar)