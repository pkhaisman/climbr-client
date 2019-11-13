import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cards from '../Cards/Cards';
import testHelpers from '../../test-helpers'

Enzyme.configure({ adapter: new Adapter() })

describe.only('<Cards />', () => {
    
    const context = { 
        usersToSwipe: testHelpers.usersToSwipe,
        users: testHelpers.users
    }
    
    it(`should render without crashing`, () => {
        shallow(<Cards />, { context });
    })
})
