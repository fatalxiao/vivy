/**
 * @file RootReducer.js
 */

// Reducers
import VivyReducer from './VivyReducer';
import createVivyOptionReducer from './VivyOptionReducer';

// ReducerNameSpaces
import {VIVY_OPTION_REDUCER_NAME_SPACE, VIVY_REDUCER_NAME_SPACE} from './ReducerNameSpace';

// Vendors
import {combineReducers, ReducersMapObject} from 'redux';
import {VivyOption} from "src/types";

/**
 * Create root reducer
 * @param options
 */
export default (options: VivyOption) => (reducers?: ReducersMapObject) => combineReducers({
    [VIVY_REDUCER_NAME_SPACE]: VivyReducer,
    [VIVY_OPTION_REDUCER_NAME_SPACE]: createVivyOptionReducer(options),
    ...reducers
});
