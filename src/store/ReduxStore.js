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
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createReduxStore(options, plugins) {
    return createStore(
        createRootReducer({
            '@@VIVY': VivyReducer
        }),
        (options?.initialState || {}),
        applyMiddleware(
            // ModelActionMiddleware,
            ...plugins?.reduce((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []),
            ...(options?.extraMiddlewares || [])
        )
    );
}
