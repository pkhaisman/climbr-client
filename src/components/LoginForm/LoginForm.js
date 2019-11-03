import React from 'react'
import { withRouter } from 'react-router-dom' 
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

class LoginForm extends React.Component {
    onLoginSuccess = () => {
        console.log('this.onLoginSuccess')
        this.props.history.push('/swipe')
    }

    handleSubmitJwtAuth = (e) =>{
        e.preventDefault()
        const { username, password } = e.target

        AuthApiService.postLogin({
            username: username.value,
            password: password.value
        })
            .then(res => {
                // username.value = '',
                // password.value = '',
                TokenService.saveAuthToken(res.authToken)
                this.onLoginSuccess()
            })
            .catch(res => {
                console.log(res.error)
            })
    }

    render() {
        return (
            <form className='LoginForm' onSubmit={(e) => this.handleSubmitJwtAuth(e)}>
                <h2>Log In</h2>
                <div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' />
                    </div>
                </div>
                <div>
                    <button type='submit'>Log In</button>
                </div>
            </form>
        );
    }
}

export default withRouter(LoginForm)