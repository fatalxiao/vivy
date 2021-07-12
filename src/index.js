/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

// Models
import asyncComponentLoading from './models/asyncComponentLoading';
import apiStatus from './models/apiStatus';

// Components
export AsyncComponent from './AsyncComponent';

// Statics
export ApiStatus from './statics/ApiStatus';

/**
 * Register model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store || !model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, apis, globalReducers, reducers} = model;

    // register or overwrite reducers
    store.asyncReducers[nameSpace] = createAsyncReducer(
        store, nameSpace, state, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // register actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // register api actions
    if (apis) {
        store.registerApiActions(nameSpace, apis || {});
    }

}

/**
 * Register models
 * @param store
 * @param models
 */
export function registerModels(store, models) {
    models.forEach(model => registerModel(store, model));
}

/**
 * Create Vivy instance
 * @param history
 * @returns {{}}
 */
export default function Vivy(history) {

    const options = {};
    const plugins = [];

    function use(plugin, options) {
        plugins.push({
            plugin,
            options
        });
    }

    function createStore() {

        const store = createVivyStore(history, plugins, options);

        registerModels(store, [
            asyncComponentLoading,
            apiStatus
        ]);

        return store;

    }

    return {

        history,
        options,

        setCheckResponseStatus: checkResponseStatus => {
            options.checkResponseStatus = checkResponseStatus;
        },

        setSuccessResponseHandler: successResponseHandler => {
            options.successResponseHandler = successResponseHandler;
        },

        setFailureResponseHandler: failureResponseHandler => {
            options.failureResponseHandler = failureResponseHandler;
        },

        applyPlugIn,

        createStore

    };

}
