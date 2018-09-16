import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import home from './reducers/home';
import bingo from './reducers/bingo';

const Config = process.env.NODE_ENV;

const getStore = () => {
    if (Config === 'development') {
        const store = createStore(
            combineReducers({
            home,
            bingo,
            }),
            applyMiddleware(logger),
        );

        return store;
    } 
    else if (Config === 'production') {
        const store = createStore(combineReducers({
            home,
            bingo,
        }));

        return store;
    }
};

export default getStore;
