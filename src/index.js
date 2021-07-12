/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

// Models
// import asyncComponentLoading from './models/asyncComponentLoading';

// // Components
// export AsyncComponent from './AsyncComponent';

/**
 * Register model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store || !model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, /* apis, */ globalReducers, reducers} = model;

    // register or overwrite reducers
    store.asyncReducers[nameSpace] = createAsyncReducer(
        store, nameSpace, state, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // register actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    store.plugins?.forEach(plugin => plugin?.onRegisterModel?.(model, store));

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

    function use(plugin) {
        plugins.push(plugin);
    }

    function createStore() {

        const store = createVivyStore(history, plugins, options);

        // registerModel(store, asyncComponentLoading);

        registerModels(
            store,
            plugins?.reduce((extraModels, plugin) => [...extraModels, ...plugin.extraModels], [])
        );

        store.registerModel = registerModel.bind(null, store);
        store.registerModels = registerModels.bind(null, store);

        plugins?.forEach(plugin => plugin?.onCreateStore?.(store));

        return store;

    }

    return {

        history,
        options,

        use,

        createStore

    };

}
