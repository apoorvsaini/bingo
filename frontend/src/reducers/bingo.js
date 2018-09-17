const bingo = (state = 
    {
        tickets: [0, 1, 2, 3],
        loading: false,
        ticketsData: {},
        ballsDrawn: [],
        markedBalls: new Set(),
        bingoStatus: false,
        bingoTickets: [],
        gameStarted: false,
        gameResult: null
    }, action) => {
        
    switch (action.type) {
        case 'LOAD_TICKETS': {
            return { ...state, loading: true };
        }

        case 'TICKETS_LOADED': {
            return { ...state, loading: false };
        }

        case 'START_GAME': {
            return { ...state, 
                gameStarted: true,
                ballsDrawn: new Array()
            };
        }

        case 'STOP_GAME': {
            return {
                tickets: [0, 1, 2, 3],
                loading: false,
                ticketsData: {},
                ballsDrawn: [],
                markedBalls: new Set(),
                bingoStatus: false,
                bingoTickets: [],
                gameStarted: false,
                gameResult: null,
            };
        }

        case 'SET_GAME_RESULT': {
            return { ...state, gameResult: action.payload };
        }

        case 'SET_TICKETS_DATA': {
            return { ...state, ticketsData: Object.assign({}, action.payload) };
        }

        case 'SET_BINGO_FALSE': {
            return { ...state, bingoStatus: false, bingoTickets: [] };
        }

        case 'SET_BINGO_TRUE': {
            return { ...state, bingoStatus: true };
        }

        case 'NEW_NUMBER_LOADED': {
            let newMarkers = state.markedBalls;
            let newBingoStatus = state.bingoStatus;
            let newBingoTickets = state.bingoTickets;

            if (newBingoStatus === false) {
                for (let i in state.ticketsData) {
                    let tickets = state.ticketsData[i];
                    
                    if (tickets.indexOf(action.payload.ball) !== -1) {
                        if (!(i in newMarkers))
                            newMarkers[i] = new Set();
                        
                        newMarkers[i].add(action.payload.ball);
    
                        if (newMarkers[i].size === 25) {
                            newBingoStatus = true;
                            newBingoTickets.push(i);
                        }
                    }
                }
            }

            if (!(action.payload in state.ballsDrawn)) {
                return { ...state, markedBalls: Object.assign({}, newMarkers), ballsDrawn: ([action.payload, ...state.ballsDrawn]).slice(0, 6), bingoStatus: newBingoStatus, bingoTickets: newBingoTickets };
            }
        }

        default: return state;
    }
};

export default bingo;
