import React from 'react'

import NavBar from '../../NavBar/NavBar'
import Chat from '../../Chat/Chat'

import './ChatPage.css'

class ChatPage extends React.Component {
    render() {
        return (
            <div className='ChatPage'>
                <NavBar updateUserLoggedIn={this.props.updateUserLoggedIn} />
                <Chat />
            </div>
        )
    }
}

export default ChatPage