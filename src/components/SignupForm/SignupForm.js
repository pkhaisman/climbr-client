import React from 'react'
import { withRouter } from 'react-router-dom'
import { default as Chatkit } from '@pusher/chatkit-server'

import AuthApiService from '../../services/auth-api-service'

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
        }
    }

    hanldeUpdateUsername = (username) => { this.setState({ username })}

    handleUpdatePassword = (password) => { this.setState({ password })}

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

        this.setState({
            username: '',
            password: ''
        })

        AuthApiService.postUser({
            username: username.value,
            password: password.value,
        })
            .then((res) => {
                this.onRegistrationSuccess(res)
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
        )
    }
}

export default withRouter(SignUpForm)