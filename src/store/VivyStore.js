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
 * @param initialState {Object}
 * @param plugins {Array}
 * @param extraMiddlewares {Array}
 * @returns {Object}
 */
export default function createVivyStore(initialState, plugins, extraMiddlewares) {

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware();

    // Create origin redux store
    const originStore = createStore(
        createRootReducer({
            '@@VIVY': VivyReducer
        }),
        initialState,
        applyMiddleware(
            ModelActionMiddleware,
            ...plugins?.reduce((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []),
            ...(extraMiddlewares || [])
        )
    );

    return {

        // Store
        ...originStore,

        // Origin store
        originStore,

        // Async reducers
        asyncReducers: {},

        // Register actions
        registerActions: ModelActionMiddleware.register,

        // All registered plugins
        plugins

    };

}
