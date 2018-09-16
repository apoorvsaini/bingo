const bingo = (state = 
    {
        tickets: [0, 1, 2, 3],
        loading: false,
        ticketsData: {},
        ballsDrawn: [],
        markedBalls: {},
        bingoStatus: false,
        bingoTickets: [],
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
            let newMarkers = state.markedBalls;
            let newBingoStatus = state.bingoStatus;
            let newBingoTickets = state.bingoTickets;

            if (newBingoStatus === false) {
                for (let i in state.ticketsData) {
                    console.log('here2');
                    let tickets = state.ticketsData[i];
                    console.log(tickets);
                    if (tickets.indexOf(action.payload.ball) !== -1) {
                        if (!(i in newMarkers))
                            newMarkers[i] = new Array();
                        if (newMarkers[i].indexOf(action.payload.ball) === -1)
                            newMarkers[i].push(action.payload.ball);
    
                        if (newMarkers[i].length === 25) {
                            newBingoStatus = true;
                            newBingoTickets.push(i);
                            alert('Bingo!');
                        }
                    }
                }
            }

            console.log('new markers')
            console.log(newMarkers);

            return { ...state, markedBalls: Object.assign({}, newMarkers), ballsDrawn: ([action.payload, ...state.ballsDrawn]).slice(0, 6), bingoStatus: newBingoStatus, bingoTickets: newBingoTickets };
        }

        default: return state;
    }
};

export default bingo;
