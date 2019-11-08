import config from '../config'

const ApiService = {
    getUser(username) {
        return fetch(`${config.API_ENDPOINT}/users/${username}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
        })
            .then(res => res.json())
    },
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    },
    getUsersToSwipe(userId) {
        return fetch(`${config.API_ENDPOINT}/users-to-swipe/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    },
    getUsersLiked(userId) {
        return fetch(`${config.API_ENDPOINT}/users-liked/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    },
    getUsersMatched(userId) {
        return fetch(`${config.API_ENDPOINT}/users-matched/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    },

    updateUser(userId, name, bio, image) {
        return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name,
                bio,
                image
            })
        })
            .then(res => res.json())
    },

    deleteUserToSwipe(userId, userToSwipeId) {
        return fetch(`${config.API_ENDPOINT}/users-to-swipe/${userId}/${userToSwipeId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            }
        })
    },

    addUserLiked(userId, userLikedId) {
        return fetch(`${config.API_ENDPOINT}/users-liked/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                user_liked_id: userLikedId
            })
        })
            .then(res => res.json())
    },
    addUserMatched(userId, userMatchedId) {
        return fetch(`${config.API_ENDPOINT}/users-matched/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                user_matched_id: userMatchedId
            })
        })
            .then(res => res.json())
    },
    addUserToSwipe(userId, userToSwipeId) {
        return fetch(`${config.API_ENDPOINT}/users-to-swipe/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                user_to_swipe_id: userToSwipeId
            })
        })
            .then(res => res.json())
    }
}

export default ApiService