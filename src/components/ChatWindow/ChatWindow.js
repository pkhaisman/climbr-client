import Moment from 'react-moment';
import React, { useState, useEffect } from 'react';
import { withChatkitOneToOne } from '@pusher/chatkit-client-react';

// import defaultAvatar from './default-avatar.png';

function ChatWindow(props) {
    const [pendingMessage, setPendingMessage] = useState('');
    const messageList = React.createRef();

    const handleMessageKeyDown = event => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleMessageChange = event => {
        setPendingMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (pendingMessage === '') {
            return;
        }
    
        props.chatkit.sendSimpleMessage({ text: pendingMessage })
        setPendingMessage('');
    };

    useEffect(() => {
        messageList.current.scrollTop = messageList.current.scrollHeight;
    });

    const messages = props.chatkit.messages.map(m => ({
        id: m.id,
        isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
        createdAt: m.createdAt,
        // This will only work with simple messages.
        // To learn more about displaying multi-part messages see
        // https://pusher.com/docs/chatkit/reference/javascript#messages
        textContent: m.parts[0].payload.content,
    }));

    return (
        <div className="ChatWindow">
            <div className="ChatWindow__titlebar">
                <img
                    // src={defaultAvatar}
                    className="ChatWindow__titlebar__avatar"
                    alt="avatar"
                />
                <div className="ChatWindow__titlebar__details">
                    <span>{props.chatkit.isLoading
                        ? 'Loading...'
                        : props.chatkit.otherUser.name}
                    </span>
                </div>
            </div>
            <div className="ChatWindow__messages" ref={messageList}>
                {messages.map(m => (
                    <Message key={m.id} {...m} />
                ))}
            </div>
            <div className="ChatWindow__compose">
                <input
                    className="ChatWindow__compose__input"
                    type="text"
                    placeholder="Type a message..."
                    value={pendingMessage}
                    onChange={handleMessageChange}
                    onKeyDown={handleMessageKeyDown}
                />
                <button className="ChatWindow__compose__button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

function Message({ isOwnMessage, isLatestMessage, createdAt, textContent }) {
    return (
        <div
            className={
                isOwnMessage
                ? 'ChatWindow__messages__message__wrapper ChatWindow__messages__message__wrapper--self'
                : 'ChatWindow__messages__message__wrapper ChatWindow__messages__message__wrapper--other'
            }
        >
            <div className="ChatWindow__messages__message__wrapper__inner">
                <div
                    className={
                        isOwnMessage
                        ? 'ChatWindow__messages__message ChatWindow__messages__message--self'
                        : 'ChatWindow__messages__message ChatWindow__messages__message--other'
                    }
                >
                    <div className="ChatWindow__messages__message__content">{textContent}</div>
                    <div className="ChatWindow__messages__message__time">
                        <Moment
                            calendar={{
                                sameDay: 'LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[last] dddd [at] LT',
                            }}
                        >
                            {createdAt}
                        </Moment>
                    </div>
                    <div
                        className={
                        isOwnMessage
                            ? 'ChatWindow__messages__message__arrow alt'
                            : 'ChatWindow__messages__message__arrow'
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default withChatkitOneToOne(ChatWindow);
