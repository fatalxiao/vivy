/**
 * @file RootReducer.ts
 * @author Liangxiaojun
 */

// Reducers
import VivyReducer from './VivyReducer';
import createVivyOptionReducer from './VivyOptionReducer';

// ReducerNameSpaces
import {VIVY_OPTION_REDUCER_NAME_SPACE, VIVY_REDUCER_NAME_SPACE} from './ReducerNameSpace';

// Vendors
import {combineReducers} from 'redux';

// Types
import {ReducersMapObject} from 'redux';
import {VivyOption} from '../types';

/**
 * Create root reducer
 * @param options
 */
export default (options: VivyOption) => (reducers?: ReducersMapObject) => combineReducers({
    [VIVY_REDUCER_NAME_SPACE]: VivyReducer,
    [VIVY_OPTION_REDUCER_NAME_SPACE]: createVivyOptionReducer(options),
    ...reducers
});
