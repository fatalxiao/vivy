/**
 * @file VivyStore.js
 */

import {createStore, applyMiddleware} from 'redux';

// Middlewares
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';

/**
 * Create Vivy store
 * @param history
 * @param plugins
 * @param extraMiddlewares
 * @returns {{}}
 */
export default function createVivyStore(history, plugins, extraMiddlewares) {

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware();

    // Create origin redux store
    const originStore = createStore(
        createRootReducer(history),
        applyMiddleware(
            thunk,
            ModelActionMiddleware,
            ...plugins?.reduce((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []),
            ...(extraMiddlewares || []),
            routerMiddleware(history)
        )
    );

    return {

        // Store
        ...originStore,

        // Origin store
        originStore,

        // History
        history,

        // Async reducers
        asyncReducers: {},

        // Register actions
        registerActions: ModelActionMiddleware.register,

        // All registered plugins
        plugins

    };

}
