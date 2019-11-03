export default {
    API_ENDPOINT: 'http://localhost:8000/api',
    // QUESTION should i be able to access this in dev mode? is having 'climbr-token-key' a security issue
    TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'climbr-token-key'
    // API_TOKEN: process.env.REACT_APP_API_TOKEN,
}