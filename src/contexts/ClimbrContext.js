import React from 'react';

const ClimbrContext = React.createContext({
    users: {},
    usersLiked: {},
    currentUser: {},
    usersToSwipe: {},
    usersMatched: {},
    handleSwipeLeft: () => {},
    handleSwipeRight: () => {},
    updateUser: () => {},
    addUserToSwipe: () => {},
});

export default ClimbrContext;