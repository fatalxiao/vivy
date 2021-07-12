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
 * @param options
 * @returns {{}}
 */
export default function createVivyStore(history, plugins, options) {

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware();

    const originStore = createStore(
        createRootReducer(history),
        applyMiddleware(
            thunk,
            ModelActionMiddleware,
            ...plugins?.reduce((extraMiddlewares, plugin) => [...extraMiddlewares, ...plugin.extraMiddlewares], []),
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
