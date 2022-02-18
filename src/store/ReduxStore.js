/**
 * @file ReduxStore.js
 */

// Redux
import {createStore, applyMiddleware} from 'redux';

// Reducers
import createRootReducer from '../reducers/RootReducer';
import VivyReducer from '../reducers/VivyReducer';

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
            '@@VIVY': VivyReducer
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
