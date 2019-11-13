import React from 'react'
import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react'
import PropTypes from 'prop-types'
import ClimbrContext from '../../contexts/ClimbrContext'
import ChatWindow from '../ChatWindow/ChatWindow'

const instanceLocator = 'v1:us1:e1f602bf-683e-4604-8c7e-8f4763d67042'

const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e1f602bf-683e-4604-8c7e-8f4763d67042/token',
});

class Chat extends React.Component {
    static contextType = ClimbrContext
    
    render() {
        const urlParams = new URLSearchParams(window.location.search)
        const otherUserId = urlParams.get('otherUserId')

        if (!this.context.users || !this.context.currentUser) {
            return null
        }

        return (
            <div className='Chat'>
                <ChatkitProvider
                    instanceLocator={instanceLocator}
                    tokenProvider={tokenProvider}
                    userId={this.context.currentUser.id.toString()}
                >
                    <ChatWindow otherUserId={otherUserId} />
                </ChatkitProvider>
            </div>
        )
    }
}

// needed for component smoke test to pass
Chat.contextTypes = {
    currentUser: PropTypes.object,
}

export default Chat