const bingo = (state = 
    {
        tickets: [0, 1, 2, 3],
        loading: false,
        ticketsData: {},
        ballsDrawn: [],
        markedBalls: []
    }, action) => {
        
    switch (action.type) {
        case 'LOAD_TICKETS': {
            return { ...state, loading: true };
        }

        case 'TICKETS_LOADED': {
            return { ...state, loading: false };
        }

        case 'SET_TICKETS_DATA': {
            return { ...state, ticketsData: Object.assign({}, action.payload) };
        }

        case 'NEW_NUMBER_LOADED': {
            return { ...state, markedBalls: [...state.markedBalls, action.payload.ball], ballsDrawn: ([action.payload, ...state.ballsDrawn]).slice(0, 6) };
        }

        default: return state;
    }
};

export default bingo;
