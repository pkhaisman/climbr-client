import React from 'react';
import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatWindow from '../ChatWindow/ChatWindow';

const instanceLocator = 'v1:us1:e1f602bf-683e-4604-8c7e-8f4763d67042'

const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e1f602bf-683e-4604-8c7e-8f4763d67042/token',
});

Enzyme.configure({ adapter: new Adapter() })

describe.only('<ChatWindow />', () => {
    it(`should render without crashing`, () => {
        shallow(
            <ChatkitProvider
                instanceLocator={instanceLocator}
                tokenProvider={tokenProvider}
                userId='1'
            >
                <ChatWindow otherUserId='2' />
            </ChatkitProvider>
        );
    })
})
