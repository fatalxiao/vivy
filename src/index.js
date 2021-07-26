/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createModelReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

/**
 * Register reducer
 * @param store
 * @param nameSpace
 * @param reducer
 */
export function registerReducer(store, nameSpace, reducer) {

    if (!nameSpace) {
        console.error('NameSpace of reducer is required.');
        return;
    }

    store.asyncReducers[nameSpace] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));

}

/**
 * Register reducers
 * @param store
 * @param reducers
 */
export function registerReducers(store, reducers) {
    Object.keys(reducers).forEach(nameSpace =>
        registerReducer(store, nameSpace, reducers[nameSpace])
    );
}

/**
 * Register model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store || !model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, globalReducers, reducers, subscriptions} = model;

    if (!nameSpace) {
        console.error('NameSpace in model is required.');
        return;
    }

    // Register or overwrite reducers
    store.asyncReducers[nameSpace] = createModelReducer(
        store,
        nameSpace,
        state || null,
        globalReducers || {},
        reducers || {}
    );
    store.replaceReducer(createRootReducer(store.asyncReducers));

    // Register actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // Register subscriptions
    if (subscriptions) {
        store.registerSubscriptions(nameSpace, subscriptions || {});
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
    models.forEach(model =>
        registerModel(store, model)
    );
}

/**
 * Create Vivy instance
 * @param options
 * @returns {{}}
 */
export default function Vivy(options) {

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
        const store = createVivyStore(plugins, op?.extraMiddlewares);

        // Register extra reducers in plugins
        registerReducers(
            store,
            plugins?.reduce((extraReducers, plugin) => ({
                ...extraReducers,
                ...plugin?.extraReducers
            }), {})
        );

        // Register extra models in plugins
        registerModels(
            store,
            plugins?.reduce((extraModels, plugin) => [
                ...extraModels,
                ...(plugin?.extraModels || [])
            ], [])
        );

        // Add methods
        store.registerReducer = registerReducer.bind(null, store);
        store.registerReducers = registerReducers.bind(null, store);
        store.registerModel = registerModel.bind(null, store);
        store.registerModels = registerModels.bind(null, store);

        // Call onCreateStore in plugins
        plugins?.forEach(plugin => plugin?.onCreateStore?.(store));

        return store;

    }

    return {

        options: op,

        plugins,

        use,

        createStore

    };

}
