import config from '../config'

const TokenService = {
    saveUserId(userId) {
        window.sessionStorage.setItem('userId', userId)
    },
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY)
        window.sessionStorage.removeItem('userId')
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    makeBasicAuthToken(username, password) {
        return window.btoa(`${username}:${password}`)
    },
}

export default TokenService
