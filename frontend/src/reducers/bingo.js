const bingo = (state = 
    {
        tickets: [0, 1, 2, 3],
        loading: false,
        ticketsData: {},
        ticketsDrawn: [],
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

        case 'NEW_TICKET_LOADED': {
            let newState = state.ticketsDrawn;
            if (newState.length === 4) {
                newState.pop();
                newState.unshift(action.payload);
            }
            else {
                newState.unshift(action.payload);
            }

            return { ...state, ticketsDrawn: newState };
        }

        default: return state;
    }
};

export default bingo;
