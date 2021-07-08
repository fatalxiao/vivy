/**
 * @file index.js
 */

// Vivy
import createVivy from './vivy';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

export AsyncComponent from './AsyncComponent';

/**
 * 注册 model
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

    // 注册 reducers
    store.asyncReducers[nameSpace] = createAsyncReducer(
        store, nameSpace, state, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // 注册 actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // 注册 apis
    if (apis) {
        store.registerApis(nameSpace, apis || {});
    }

}

/**
 * 注册 models
 * @param store
 * @param models
 */
export function registerModels(store, models) {
    models.forEach(model => registerModel(store, model));
}

export default (history) => {

    this.history = history;
    this.store = null;

    return {

        createStore: () => {
            return this.store = createVivy(this.history);
        }

    };

};
