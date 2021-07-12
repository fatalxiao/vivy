/**
 * @file RootReducer.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// Return reducer
export default (history, asyncReducers) => combineReducers({
    router: connectRouter(history),
    ...asyncReducers
});
