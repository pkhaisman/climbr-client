import React from 'react'
import NavBar from '../../NavBar/NavBar'
import LoginForm from '../../LoginForm/LoginForm'
import './LoginPage.css'

function LoginPage() {
    return (
        <div className='LoginPage'>
            <NavBar />
            <LoginForm />
        </div>
    )
}

export default LoginPage