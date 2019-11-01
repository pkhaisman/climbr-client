import React from 'react';

const ClimbrContext = React.createContext({
    users: {},
    currentUser: {},
    handleSwipeLeft: () => {},
    handleSwipeRight: () => {},
    handleMockUserLogin: () => {},
});

export default ClimbrContext;