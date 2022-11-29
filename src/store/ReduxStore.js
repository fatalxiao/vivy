/**
 * @file ReduxStore.js
 */

// Redux
import {legacy_createStore as createStore, applyMiddleware} from 'redux';

// Reducers
import createRootReducer from '../reducers/RootReducer';
import VivyReducer from '../reducers/VivyReducer';
import createVivyOptionReducer from '../reducers/VivyOptionReducer';

// ReducerNameSpaces
import {VIVY_REDUCER_NAME_SPACE, VIVY_OPTION_REDUCER_NAME_SPACE} from '../reducers/ReducerNameSpace';

/**
 * Create Redux store
 * @param options {Object}
 * @param middlewares {Array}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createReduxStore(options, middlewares, plugins) {
    return createStore(
        createRootReducer({
            [VIVY_REDUCER_NAME_SPACE]: VivyReducer,
            [VIVY_OPTION_REDUCER_NAME_SPACE]: createVivyOptionReducer(options)
        }),
        (options?.initialState || {}),
        applyMiddleware(
            ...middlewares,
            ...plugins?.reduce((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []),
            ...(options?.extraMiddlewares || [])
        )
    );
}
