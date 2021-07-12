/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

/**
 * Register model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store || !model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, globalReducers, reducers} = model;

    // register or overwrite reducers
    store.asyncReducers[nameSpace] = createAsyncReducer(
        store, nameSpace, state, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // register actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // call onRegisterModel in plugins
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

    /**
     * use vivy plugin
     * @param plugin
     */
    function use(plugin) {
        plugins.push(plugin);
    }

    /**
     * create store
     * @returns {{}|*}
     */
    function createStore() {

        // create a vivy store
        const store = createVivyStore(history, plugins, options);

        // register extra models in plugins
        registerModels(
            store,
            plugins?.reduce((extraModels, plugin) => [...extraModels, ...plugin.extraModels], [])
        );

        // add methods
        store.registerModel = registerModel.bind(null, store);
        store.registerModels = registerModels.bind(null, store);

        // call onCreateStore in plugins
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
