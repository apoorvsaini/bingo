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

export const markTicket = ball => ({
    type: 'MARK_TICKET',
    payload: ball
});

export const markManualTicket = data => ({
    type: 'MARK_MANUAL_TICKET',
    payload: data
});

export const setBingoFalse = () => ({
    type: 'SET_BINGO_FALSE',
});

export const setBingoTrue = () => ({
    type: 'SET_BINGO_TRUE',
});

export const setGameResult = (data) => ({
    type: 'SET_GAME_RESULT',
    payload: data
});
