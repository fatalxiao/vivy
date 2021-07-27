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
 * @param store {Object}
 * @param nameSpace {string}
 * @param reducer {Function}
 */
export function registerReducer(store, nameSpace, reducer) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpace) {
        console.error('NameSpace of reducer is required.');
        return;
    }

    store.asyncReducers[nameSpace] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));

}

/**
 * Register reducers
 * @param store {Object}
 * @param reducers {Object}
 */
export function registerReducers(store, reducers) {
    Object.keys(reducers).forEach(nameSpace =>
        registerReducer(store, nameSpace, reducers[nameSpace])
    );
}

/**
 * Unregister reducer
 * @param store {Object}
 * @param nameSpace {string}
 */
export function unregisterReducer(store, nameSpace) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpace) {
        console.error('NameSpace of reducer is required.');
        return;
    }

    const nextReducers = {...store.asyncReducers};
    delete nextReducers[nameSpace];
    store.replaceReducer(createRootReducer(nextReducers));

}

/**
 * Unregister reducers
 * @param store {Object}
 * @param nameSpacesOrReducers {Array|Object}
 */
export function unregisterReducers(store, nameSpacesOrReducers) {
    if (Array.isArray(nameSpacesOrReducers)) { // nameSpaces
        nameSpacesOrReducers.forEach(nameSpace =>
            unregisterReducer(store, nameSpace)
        );
    } else { // reducers
        Object.keys(nameSpacesOrReducers).forEach(nameSpace =>
            unregisterReducer(store, nameSpace)
        );
    }
}

/**
 * Register model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!model) {
        console.error('Model is required.');
        return;
    }

    const {nameSpace, state, actions, globalReducers, reducers} = model;

    if (!nameSpace) {
        console.error('NameSpace in model is required.');
        return;
    }

    // Register or overwrite reducers
    store.asyncReducers[nameSpace] = createModelReducer(
        store,
        nameSpace,
        state ?? null,
        globalReducers ?? {},
        reducers ?? {}
    );
    store.replaceReducer(createRootReducer(store.asyncReducers));

    // Register actions
    if (actions) {
        store.registerActions(nameSpace, actions ?? {});
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
