export const loadTickets = () => ({
    type: 'LOAD_TICKETS'
});

export const ticketsLoaded = () => ({
    type: 'TICKETS_LOADED'
});

export const setTicketsData = data => ({
    type: 'SET_TICKETS_DATA',
    payload: data
});

export const startGame = () => ({
    type: 'START_GAME',
});

export const stopGame = () => ({
    type: 'STOP_GAME',
});

export const setNewBall = ball => ({
    type: 'NEW_NUMBER_LOADED',
    payload: ball
});

export const setBingoFalse = () => ({
    type: 'SET_BINGO_FALSE',
});

export const setBingoTrue = () => ({
    type: 'SET_BINGO_TRUE',
});