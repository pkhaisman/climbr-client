import React from 'react';
import ProfilePage from './ProfilePage';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import testHelpers from '../../../test-helpers'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
    const context = { 
        currentUser: testHelpers.currentUser,
    }
    
    shallow(<ProfilePage />, { context });
});