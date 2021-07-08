/**
 * @file RootReducer.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default (history, asyncReducers) => combineReducers({
    router: connectRouter(history),
    ...asyncReducers
});
