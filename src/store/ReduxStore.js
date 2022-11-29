/**
 * @file ReduxStore.js
 */

// Redux
import {legacy_createStore as createStore, applyMiddleware} from 'redux';

/**
 * Create Redux store
 * @param rootReducer {Object}
 * @param options {Object}
 * @param middlewares {Array}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createReduxStore(rootReducer, options, middlewares, plugins) {
    return createStore(
        rootReducer,
        options?.initialState || {},
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
