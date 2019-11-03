import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    hanldeUpdateUsername = (username) => { this.setState({ username })}

    handleUpdatePassword = (password) => { this.setState({ password })}

    onRegistrationSuccess = () => {
        this.props.history.push('/swipe')
    }

    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = e.target

        this.setState({
            username: '',
            password: ''
        })

        AuthApiService.postUser({
            username: username.value,
            password: password.value,
        })
            .then((res) => {
                this.onRegistrationSuccess()
            })
            .catch(() => {
                console.log('error')
            })
    }

    render() {
        return (
            <form className='SignUpForm' onSubmit={this.handleSubmit}>
                <h2 className='SignUpForm__title'>Sign Up</h2>
                <div className='SignUpForm__user-inputs'>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input className='SignUpForm__user-input' type='text' name='username' id='username' onChange={(e) => this.hanldeUpdateUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input className='SignUpForm__user-input' type='password' name='password' id='password' onChange={(e) => this.handleUpdatePassword(e.target.value)} />
                    </div>
                </div>
                <div className='SignUpForm__buttons'>
                    <button className='SignUpForm__buttons__signup' type='submit'>Sign Up</button>
                </div>
            </form>
        );
    }
}

export default withRouter(SignUpForm);