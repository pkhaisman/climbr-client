import React from 'react'
import { Link } from 'react-router-dom'
import ClimbrContext from '../../contexts/ClimbrContext'
import './NavBar.css'

class NavBar extends React.Component {
    static contextType = ClimbrContext

    render() {
        return (
            <nav className='NavBar'>
                <ul className='NavBar__list'>
                    <li><Link to ={'/'}>Home</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/swipe'}>Swipe</Link></li>
                    <li><Link to={'/match'}>Matches</Link></li>
                    {/* <li><button onClick={(e) => this.context.handleMockUserLogin(this.context.users[0])}>Phil</button></li> */}
                    {/* <li><button onClick={(e) => this.context.handleMockUserLogin(this.context.users[1])}>Mike</button></li> */}
                </ul>
            </nav>
        )
    }
}

export default NavBar