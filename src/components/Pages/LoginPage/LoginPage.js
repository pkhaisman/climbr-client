import React from 'react'
import NavBar from '../../NavBar/NavBar'
import LoginForm from '../../LoginForm/LoginForm'
import './LoginPage.css'

function LoginPage(props) {
    return (
        <div className='LoginPage'>
            <NavBar />
            <LoginForm updateUserLoggedIn={props.updateUserLoggedIn} />
        </div>
    )
}

export default LoginPage