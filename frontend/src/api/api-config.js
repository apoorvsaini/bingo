module.exports = { 
    API_URL: 'http://127.0.0.1:3000/',

    // API Endpoints
    API_AUTH: 'auth',
    API_GENERATE: 'generate',
    API_BINGO: 'bingo',
    API_DRAW: 'draw',

    // Socket options
    SOCKET_OPTIONS: {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: 99999,
    },
};