export const setErr = error => ({
    type: 'SET_ERROR',
    payload: error,
});

export const setUserId = userId => ({
    type: 'SET_USER_ID',
    payload: userId,
});

export const setConnected = (status) => ({
    type: 'SET_CONNECTED',
    payload: status
});
