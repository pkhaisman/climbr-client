import React from 'react'
import { withRouter } from 'react-router-dom' 
import ValidationError from '../ValidationError/ValidationError'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import ApiService from '../../services/api-service'
import '../App/App.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            usernameValid: false,
            passwordValid: false,
            validationMessages: {
                invalidCreds: ''
            },
            disableButton: true,
            formValid: false,
        }
    }

    updateUsername = (username) => { this.setState({ username }, () => this.validateForm()) }

    updatePassword = (password) => { this.setState({ password }, () => this.validateForm()) }

    validateForm = () => {
        this.state.username && this.state.password 
            ? this.setState({ disableButton: false })
            : this.setState({ disableButton: true }) 
    }

    onLoginSuccess = () => {
        this.props.history.push('/profile')
        this.props.updateUserLoggedIn(true)
    }

    handleSubmitJwtAuth = (e) =>{
        e.preventDefault()
        const { username, password } = e.target

        ApiService.getUser(username.value)
            .then(dbUser => {
                AuthApiService.postLogin({
                    username: username.value,
                    password: password.value
                })
                    .then(res => {
                        TokenService.saveAuthToken(res.authToken)
                        TokenService.saveUserId(dbUser.user.id)
                        this.onLoginSuccess()
                    })
                    .catch(res => {
                        this.setState({ 
                            validationMessages: {
                                invalidCreds: 'Invalid login credentials'
                            },
                            formValid: false
                        })
                    })
            })

    }

    render() {
        return (
            <form className='Form' onSubmit={(e) => this.handleSubmitJwtAuth(e)}>
                <h2 className="Form__title">Log In</h2>
                <div>
                    <div>
                        <label className='Form__user-inputs__label' htmlFor='username'>Username</label>
                        <input className='Form__user-inputs__input' type='text' name='username' id='username' onChange={(e) => this.updateUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className='Form__user-inputs__label' htmlFor='password'>Password</label>
                        <input className='Form__user-inputs__input' type='password' name='password' id='password' onChange={(e) => this.updatePassword(e.target.value)} />
                    </div>
                </div>
                <ValidationError hasError={!this.state.formValid} message={this.state.validationMessages.invalidCreds} />
                <div className='Form__buttons'>
                    <button className='Form__buttons__login' type='submit' disabled={this.state.disableButton}>Log In</button>
                </div>
            </form>
        );
    }
}

export default withRouter(LoginForm)