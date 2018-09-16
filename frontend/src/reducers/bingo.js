const bingo = (state = 
    {
        tickets: [0, 1, 2, 3],
        loading: false,
        ticketsData: {},
        ballsDrawn: [],
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
            let newState = state.ballsDrawn;
            console.log(([action.payload, ...state.ballsDrawn]).slice(0, 4));

            return { ...state, ballsDrawn: ([action.payload, ...state.ballsDrawn]).slice(0, 4) };
        }

        default: return state;
    }
};

export default bingo;
