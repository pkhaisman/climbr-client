import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './NavBar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProfileActive: this.props.match.path === '/profile' ? true : false,
            isSwipeActive: this.props.match.path === '/swipe' ? true : false,
            isMatchActive: this.props.match.path === '/match' ? true : false,
        }
    }



    handleLogoutClick = (e) => {
        TokenService.clearAuthToken()
        this.props.history.push('/login')
        this.props.updateUserLoggedIn(false)
    }

    // REFACTOR
    handleProfileClick = () => {
        this.setState({
            isProfileActive: true,
            isSwipeActive: false,
            isMatchActive: false
        })
    }

    handleSwipeClick = () => {
        this.setState({
            isProfileActive: false,
            isSwipeActive: true,
            isMatchActive: false
        })
    }

    handleMatchClick = () => {
        this.setState({
            isProfileActive: false,
            isSwipeActive: false,
            isMatchActive: true
        })
    }

    render() {
        return TokenService.hasAuthToken() 
            ? <nav className='NavBar'>
                <ul className='NavBar__list'>
                    <li><Link className={`NavBar__list__item ${this.state.isProfileActive ? 'active' : ''}`} to={'/profile'} onClick={() => this.handleProfileClick()}>Profile</Link></li>
                    <li><Link className={`NavBar__list__item ${this.state.isSwipeActive ? 'active' : ''}`} to={'/swipe'} onClick={() => this.handleSwipeClick()}>Swipe</Link></li>
                    <li><Link className={`NavBar__list__item ${this.state.isMatchActive ? 'active' : ''}`} to={'/match'} onClick={() => this.handleMatchClick()}>Matches</Link></li>
                    <li><button className='NavBar__list__logout' onClick={(e) => this.handleLogoutClick(e)}>Log Out</button></li>
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