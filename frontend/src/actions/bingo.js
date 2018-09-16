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

export const setNewBall = ball => ({
    type: 'NEW_NUMBER_LOADED',
    payload: ball
});