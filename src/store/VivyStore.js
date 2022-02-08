/**
 * @file VivyStore.js
 */

// Vendors
import {createStore, applyMiddleware} from 'redux';

// Middlewares
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';
import VivyReducer from '../reducers/VivyReducer';

/**
 * Create Vivy store
 * @param options {Object}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createVivyStore(options, plugins) {

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware();

    // Create origin redux store
    const originStore = createStore(
        createRootReducer({
            '@@VIVY': VivyReducer
        }),
        (options?.initialState || {}),
        applyMiddleware(
            ModelActionMiddleware,
            ...plugins?.reduce((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []),
            ...(options?.extraMiddlewares || [])
        )
    );

    /**
     * Vivy store dispatch
     * @param args
     * @returns {*}
     */
    function dispatch(...args) {
        return originStore.dispatch(...args);
    }

    return {

        // Store
        ...originStore,

        // Origin store
        originStore,

        dispatch,

        // Vivy options
        options: options || {},

        // Async reducers
        asyncReducers: {},

        // Register actions
        registerActions: ModelActionMiddleware.register,

        // Unregister actions
        unregisterActions: ModelActionMiddleware.unregister,

        // All registered plugins
        plugins: plugins || []

    };

}
