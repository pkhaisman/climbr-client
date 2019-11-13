import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Matches from '../Matches/Matches';
import testHelpers from '../../test-helpers'

Enzyme.configure({ adapter: new Adapter() })

describe.only('<Matches />', () => {
    
    const context = { 
        users: testHelpers.users,
        usersMatched: testHelpers.usersMatched
    }
    
    it(`should render without crashing`, () => {
        shallow(<Matches />, { context });
    })
})
