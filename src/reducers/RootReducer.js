/**
 * @file RootReducer.js
 */

// Reducers
import VivyReducer from './VivyReducer';
import createVivyOptionReducer from './VivyOptionReducer';

// ReducerNameSpaces
import {VIVY_OPTION_REDUCER_NAME_SPACE, VIVY_REDUCER_NAME_SPACE} from './ReducerNameSpace';

// Vendors
import {combineReducers} from 'redux';

/**
 * Create root reducer
 * @param reducers {Object}
 * @returns {Reducer}
 */
export default reducers => combineReducers({
    [VIVY_REDUCER_NAME_SPACE]: VivyReducer,
    [VIVY_OPTION_REDUCER_NAME_SPACE]: createVivyOptionReducer(options),
    ...reducers
});
