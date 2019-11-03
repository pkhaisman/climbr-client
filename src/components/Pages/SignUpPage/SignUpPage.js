import React from 'react'
import NavBar from '../../NavBar/NavBar'
import SignUpForm from '../../SignUpForm/SignUpForm'
import './SignUpPage.css'

function SignUpPage() {
    return (
        <div className='SignUpPage'>
            <NavBar />
            <SignUpForm />
        </div>
    )
}

export default SignUpPage