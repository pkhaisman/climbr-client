import React                        from 'react'
import { BrowserRouter, withRouter }     from 'react-router-dom'
import PublicRoutes from '../Routes/PublicRoutes/PublicRoutes'
import PrivateRoutes from '../Routes/PrivateRoutes/PrivateRoutes'
import TokenService from '../../services/token-service'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLoggedIn: TokenService.hasAuthToken()
        }
    }

    updateUserLoggedIn = (boolean) => {
        this.setState({
            userLoggedIn: boolean
        })
    }

    render() {
        return (
            <BrowserRouter>
                <main className='App'>
                    {this.state.userLoggedIn
                        ? <PrivateRoutes updateUserLoggedIn={this.updateUserLoggedIn} />
                        : <PublicRoutes updateUserLoggedIn={this.updateUserLoggedIn}  />}
                </main>
            </BrowserRouter>
        )
    }
}

export default withRouter(App)