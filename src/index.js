/**
 * @file index.js
 */

// Vivy
import createVivyStore from './store/vivy';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

// Components
export * as AsyncComponent from './AsyncComponent';

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

    if (store.asyncReducers.hasOwnProperty(nameSpace)) {
        console.error(`nameSpace: ${nameSpace} has been registered.`);
    }

    // register reducers
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

    this.history = history;
    this.store = null;

    return {

        createStore: () => {
            return this.store = createVivyStore(this.history);
        },

        registerModel: model => {

            if (!this.store) {
                return;
            }

            registerModel(this.store, model);

        },

        registerModels: models => {

            if (!this.store) {
                return;
            }

            registerModels(this.store, models);

        }

    };

}
