/**
 * @file RootReducer.js
 */

// Vendors
import {combineReducers} from 'redux';

/**
 * Create root reducer
 * @param reducers
 * @returns {Reducer}
 */
export default reducers => combineReducers({
    ...reducers
});
