import React from 'react'
import ClimbrContext from '../../../contexts/ClimbrContext'
import NavBar from '../../NavBar/NavBar'
import Cards from '../../Cards/Cards'
import './SwipePage.css'

class SwipePage extends React.Component {
    static contextType = ClimbrContext

    render() {
        if (!this.context.users) {
            return null
        }

        if (!this.context.currentUser.name) {
            return (
                <div>
                    <NavBar updateUserLoggedIn={this.props.updateUserLoggedIn}/>
                    <div className='SwipePage__error'>You must fill out your profile before you can swipe!</div>
                </div>
            )
        }

        return (
            <div className='SwipePage'>
                <NavBar updateUserLoggedIn={this.props.updateUserLoggedIn}/>
                <Cards />
            </div>
        )
    }

}

export default SwipePage