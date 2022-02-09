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
     * @returns {*}
     */
    function dispatch() {
        return originStore.dispatch.apply(this, arguments);
    }

    /**
     * Register Reducer
     * @param nameSpace
     * @param reducer
     * @returns {*}
     */
    function registerReduxReducer(nameSpace, reducer) {

        if (!this) {
            return;
        }

        this.asyncReducers[nameSpace] = reducer;
        this.replaceReducer(createRootReducer(this.asyncReducers));

        return reducer;

    }

    /**
     * Unregister reducer
     * @param nameSpace
     * @returns {*}
     */
    function unregisterReduxReducer(nameSpace) {

        if (!this) {
            return;
        }

        const nextReducers = {...this.asyncReducers};
        const unregisteredReducer = nextReducers[nameSpace];

        delete nextReducers[nameSpace];
        this.replaceReducer(createRootReducer(nextReducers));

        return unregisteredReducer;

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

        // Register reducers
        registerReduxReducer,

        // Unregister reducers
        unregisterReduxReducer,

        // Register actions
        registerReduxActions: ModelActionMiddleware.register,

        // Unregister actions
        unregisterReduxActions: ModelActionMiddleware.unregister,

        // All registered plugins
        plugins: plugins || []

    };

}
