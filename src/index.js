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

// Components
export AsyncComponent from './AsyncComponent';

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
 * @param options
 * @returns {{}}
 */
export default function Vivy(history, options) {
    return {
        history,
        options,
        createStore: () => {

            const store = createVivyStore(history, options);

            registerModels(store, [
                asyncComponentLoading
            ]);

            return store;

        }
    };
}
