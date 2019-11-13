import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../NavBar/NavBar'
import Profile from '../../Profile/Profile'
import ClimbrContext from '../../../contexts/ClimbrContext'
import './ProfilePage.css'

class ProfilePage extends React.Component {
    static contextType = ClimbrContext

    render() {
        const { name, bio, image } = this.context.currentUser

        return (
            <div className='ProfilePage'>
                <NavBar updateUserLoggedIn={this.props.updateUserLoggedIn} />
                <Profile name={name} bio={bio} image={image} />
            </div>
        )
    }
}

// needed for component smoke test to pass
ProfilePage.contextTypes = {
    currentUser: PropTypes.object,
}

export default ProfilePage