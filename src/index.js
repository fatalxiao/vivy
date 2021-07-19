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

    if (!nameSpace) {
        console.error('NameSpace in model is required.');
        return;
    }

    // Register or overwrite reducers
    store.asyncReducers[nameSpace] = createAsyncReducer(
        store, nameSpace, state || null, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // Register actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // Call onRegisterModel in plugins
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
 * @param options
 * @returns {{}}
 */
export default function Vivy(history, options) {

    const op = {...options};
    const plugins = [];

    /**
     * Use vivy plugin
     * @param plugin
     */
    function use(plugin) {
        plugins.push(plugin);
    }

    /**
     * Create store
     * @returns {{}|*}
     */
    function createStore() {

        // Create a vivy store
        const store = createVivyStore(history, plugins, op?.extraMiddlewares);

        // Register extra models in plugins
        registerModels(
            store,
            plugins?.reduce((extraModels, plugin) => [...extraModels, ...(plugin?.extraModels || [])], [])
        );

        // Add methods
        store.registerModel = registerModel.bind(null, store);
        store.registerModels = registerModels.bind(null, store);

        // Call onCreateStore in plugins
        plugins?.forEach(plugin => plugin?.onCreateStore?.(store));

        return store;

    }

    return {

        history,
        options: op,

        use,

        createStore

    };

}
