import React from 'react'
import { withRouter } from 'react-router-dom'
import { default as Chatkit } from '@pusher/chatkit-server'
import ValidationError from '../ValidationError/ValidationError'
import AuthApiService from '../../services/auth-api-service'
import '../App/App.css'

const chatkit = new Chatkit({
    // TODO hide me
    instanceLocator: 'v1:us1:e1f602bf-683e-4604-8c7e-8f4763d67042',
    key: '41431f84-0a71-444c-bfc8-ea47104b3a58:lrEgPBJE+qBmimJvjOC4uATPOWEDe3HwtfWssDHS58o=',
})

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            formValid: false,
            displayMessage: false,
            validationMessages: {
                username: '',
                password: '',
            }
        }
    }

    hanldeUpdateUsername = (username) => { this.setState({ username }, () => this.validateForm()) }

    handleUpdatePassword = (password) => { this.setState({ password }, () => this.validateForm()) }

    validateForm = () => {
        this.setState({
            displayMessage: false
        })
        this.state.username && this.state.password 
            ? this.setState({ formValid: true })
            : this.setState({ formValid: false }) 
    }

    renderError = (error) => {
        // if error includes username then set username error message
        if (error.includes('Username')) {
            this.setState({
                validationMessages: {
                    username: error
                },
                displayMessage: true,
            })
        // else if error includes password then set the password error message
        } else if (error.includes('Password')) {
            this.setState({
                validationMessages: {
                    password: error
                },
                displayMessage: true,
            })
        }
    }

    onRegistrationSuccess = (user) => {
        // create user in chatkit
        chatkit.createUser({
            id: user.id.toString(),
            name: user.username,
        })
            .catch((err) => {
                console.log(err)
            })
        
        this.props.history.push('/login')
    }

    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = e.target

        
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
        })
        .then((res) => {
            // if there are no error messages then redirect
            if (!this.state.validationMessages.username && !this.state.validationMessages.password) {
                    this.setState({
                        username: '',
                        password: ''
                    })
                    this.onRegistrationSuccess(res)
                }
            })
            .catch((res) => {
                res.error 
                    ? this.renderError(res.error)
                    : this.setState({
                        validationMessages: {
                            username: '',
                            password: ''
                        }
                    })
            })
    }

    render() {
        return (
            <form className='Form' onSubmit={this.handleSubmit}>
                <h2 className='Form__title'>Sign Up</h2>
                <div className='Form__user-inputs'>
                    <div>
                        <label className='Form__user-inputs__label' htmlFor='username'>Username</label>
                        <input className='Form__user-inputs__input' type='text' name='username' id='username' onChange={(e) => this.hanldeUpdateUsername(e.target.value)} />
                        <ValidationError hasError={this.state.displayMessage} message={this.state.validationMessages.username} />
                    </div>
                    <div>
                        <label className='Form__user-inputs__label' htmlFor='password'>Password</label>
                        <input className='Form__user-inputs__input' type='password' name='password' id='password' onChange={(e) => this.handleUpdatePassword(e.target.value)} />
                        <ValidationError hasError={this.state.displayMessage} message={this.state.validationMessages.password} />
                    </div>
                </div>
                <div className='Form__buttons'>
                    <button className='Form__buttons__signup' type='submit' disabled={!this.state.formValid}>Sign Up</button>
                </div>
            </form>
        )
    }
}

export default withRouter(SignUpForm)