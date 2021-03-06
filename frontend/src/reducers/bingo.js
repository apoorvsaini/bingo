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

        case 'MARK_MANUAL_TICKET': {
            let ticketId = action.payload.tickedId;
            let ball = action.payload.ball;
            let newMarkers = state.markedBalls;
            let newBingoStatus = state.bingoStatus;
            let newBingoTickets = state.bingoTickets;

            let tickets = state.ticketsData[ticketId];
            if (tickets.indexOf(ball) !== -1) {
                if (!(ticketId in newMarkers))
                    newMarkers[ticketId] = new Set();
                
                newMarkers[ticketId].add(ball);

                if (newMarkers[ticketId].size === 25) {
                    newBingoStatus = true;
                    newBingoTickets.push(ticketId);
                }
            }

            return { ...state, bingoStatus: newBingoStatus, bingoTickets: newBingoTickets, markedBalls: Object.assign({}, newMarkers), };
        }

        case 'MARK_TICKET': {
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

            return { ...state, bingoStatus: newBingoStatus, bingoTickets: newBingoTickets, markedBalls: Object.assign({}, newMarkers), };
        }

        case 'NEW_NUMBER_LOADED': {

            if (!(action.payload in state.ballsDrawn)) {
                return { ...state, ballsDrawn: ([action.payload, ...state.ballsDrawn]).slice(0, 6)};
            }
        }

        default: return state;
    }
};

export default bingo;
