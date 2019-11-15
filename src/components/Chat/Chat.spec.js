import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chat from '../Chat/Chat';
import testHelpers from '../../test-helpers'

Enzyme.configure({ adapter: new Adapter() })

describe('<Chat />', () => {    
    const context = { 
        currentUser: testHelpers.currentUser,
    }
    
    it(`should render without crashing`, () => {
        shallow(<Chat />, { context });
    })
})
