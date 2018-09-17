const home = (state = 
    {
        userId: null,
        showErr: false,
        connected: false,
    }, action) => {
        
    switch (action.type) {
        case 'SET_USER_ID': {
            return { ...state, userId: action.payload };
        }

        case 'STOP_GAME': {
            return { ...state, 
                showErr: false,
                connected: false, 
            };
        }

        case 'SET_ERROR': {
            return { ...state, showErr: action.payload };
        }

        case 'SET_CONNECTED': {
            return { ...state, connected: action.payload };
        }

        default: return state;
    }
};

export default home;
