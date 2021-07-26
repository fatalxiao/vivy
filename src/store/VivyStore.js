/**
 * @file VivyStore.js
 */

import {createStore, applyMiddleware} from 'redux';

// Middlewares
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';
import VivyReducer from '../reducers/VivyReducer';

/**
 * Create Vivy store
 * @param plugins
 * @param extraMiddlewares
 * @returns {{}}
 */
export default function createVivyStore(plugins, extraMiddlewares) {

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware();

    // Create origin redux store
    const originStore = createStore(
        createRootReducer({
            '@@VIVY': VivyReducer
        }),
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

    };

}
