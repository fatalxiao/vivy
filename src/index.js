/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createModelReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

// Utils
import {isEmptyObject} from './util/Util';

/**
 * Handle Vivy hooks in options and plugins.
 * @param options
 * @param plugins
 * @param hookName
 * @param args
 */
function handlePluginsHook(options, plugins, hookName, ...args) {
    options?.[hookName]?.(...args);
    plugins?.forEach?.(plugin => plugin?.[hookName]?.(...args));
}

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

    if (!store.options?.overwriteSameNameSpaceModel && store.asyncReducers.hasOwnProperty(nameSpace)) {
        // console.error('Same nameSpace reducer already exists.');
        return;
    }

    store.asyncReducers[nameSpace] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));

    // Call onRegisterReducer in plugins
    handlePluginsHook(
        store.options, store.plugins,
        'onRegisterReducer',
        reducer, nameSpace, store
    );

}

/**
 * Register reducers
 * @param store {Object}
 * @param reducers {Object}
 */
export function registerReducers(store, reducers) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!reducers) {
        console.error('Reducers is required.');
        return;
    }

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
    const unregisteredReducer = nextReducers[nameSpace];
    delete nextReducers[nameSpace];
    store.replaceReducer(createRootReducer(nextReducers));

    // Call onUnregisterReducer in plugins
    handlePluginsHook(
        store.options, store.plugins,
        'onUnregisterReducer',
        unregisteredReducer, nameSpace, store
    );

}

/**
 * Unregister reducers
 * @param store {Object}
 * @param nameSpacesOrReducers {Array<string>|Object}
 */
export function unregisterReducers(store, nameSpacesOrReducers) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpacesOrReducers) {
        console.error('NameSpaces or reducers is required.');
        return;
    }

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
 * @param store {Object}
 * @param model {Object}
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

    if (!store.options?.overwriteSameNameSpaceModel && store.asyncReducers.hasOwnProperty(nameSpace)) {
        // console.error('Same nameSpace reducer already exists.');
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
        store.registerActions(nameSpace, actions ?? {}, store);
    }

    // Call onRegisterModel in plugins
    handlePluginsHook(
        store.options, store.plugins,
        'onRegisterModel',
        model, store
    );

}

/**
 * Register models
 * @param store {Object}
 * @param models {Array<Object>}
 */
export function registerModels(store, models) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!models) {
        console.error('Models is required.');
        return;
    }

    models.forEach(model =>
        registerModel(store, model)
    );

}

/**
 * Unregister model
 * @param store {Object}
 * @param nameSpaceOrModel {string|Object}
 */
export function unregisterModel(store, nameSpaceOrModel) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpaceOrModel) {
        console.error('NameSpace or model is required.');
        return;
    }

    const nextReducers = {...store.asyncReducers};
    let unregisteredModel;

    if (typeof nameSpaceOrModel === 'string') { // nameSpace
        unregisteredModel = nextReducers[nameSpaceOrModel];
        delete nextReducers[nameSpaceOrModel];
    } else { // model
        unregisteredModel = nextReducers[nameSpaceOrModel.nameSpace];
        delete nextReducers[nameSpaceOrModel.nameSpace];
    }

    store.replaceReducer(createRootReducer(nextReducers));

    // Call onUnregisterModel in plugins
    handlePluginsHook(
        store.options, store.plugins,
        'onUnregisterModel',
        unregisteredModel, store
    );

}

/**
 * Unregister models
 * @param store {Object}
 * @param nameSpacesOrModels {Array<string|Object>}
 */
export function unregisterModels(store, nameSpacesOrModels) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpacesOrModels) {
        console.error('NameSpaces or models is required.');
        return;
    }

    nameSpacesOrModels.forEach(nameSpaceOrModel =>
        unregisterModel(store, nameSpaceOrModel)
    );

}

/**
 * Same as bindActionCreator in Redux
 * @param actionCreator
 * @param dispatch
 * @returns {function(): *}
 */
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        return dispatch(actionCreator.apply(this, arguments));
    };
}

/**
 * Build action or reducer methods with dispatch
 * @param modelActionCreator {string}
 * @param dispatch {Function}
 * @returns {Function}
 */
function buildModelActionCreator(modelActionCreator, dispatch) {

    if (!modelActionCreator) {
        return;
    }

    if (!dispatch || typeof dispatch !== 'function') {
        console.error('Dispatch is required.');
        return;
    }

    return function (args) {
        return dispatch({
            ...args,
            type: modelActionCreator
        });
    };

}

/**
 * Build actions or reducers methods with dispatch, and bind them into your props
 * Just like "bindActionCreators" in redux
 * @param modelActionCreators {Object}
 * @param dispatch {Function}
 * @returns {Object}
 */
export function bindModelActionCreators(modelActionCreators, dispatch) {

    if (!modelActionCreators) {
        return null;
    }

    if (!dispatch || typeof dispatch !== 'function') {
        console.error('Dispatch is required.');
        return null;
    }

    if (typeof modelActionCreators === 'function') {
        return bindActionCreator(modelActionCreators, dispatch);
    }

    if (typeof modelActionCreators !== 'object') {
        return null;
    }

    const boundModelActionCreators = {};

    Object.entries(modelActionCreators).forEach(([key, modelActionCreator]) => {
        if (typeof modelActionCreator === 'function') {
            boundModelActionCreators[key] = bindActionCreator(modelActionCreator, dispatch);
        } else if (typeof modelActionCreator === 'string') {
            boundModelActionCreators[key] = buildModelActionCreator(modelActionCreator, dispatch);
        }
    });

    return boundModelActionCreators;

}

/**
 * Default Vivy options
 * @type {{overwriteSameNameSpaceModel: boolean}}
 */
const DEFAULT_OPTIONS = {

    /**
     * Whether overwrite same name space model when registering ( Default false )
     */
    overwriteSameNameSpaceModel: false

};

/**
 * Create Vivy instance
 * @param opts
 * @returns {Object}
 * @constructor
 */
export default function Vivy(opts) {

    // Vivy options
    const options = {
        ...DEFAULT_OPTIONS,
        ...opts
    };

    // All Vivy plugins
    const plugins = [];

    /**
     * Use vivy plugin
     * @param plugin {Object}
     */
    function use(plugin) {

        plugins.push(plugin);

        // Call onUsePlugin in options
        options.onUsePlugin?.(plugin, options, plugins);

        // Call onUse in plugin
        plugin?.onUse?.(options, plugins);

    }

    /**
     * Register extra reducers in options.
     * @param store
     */
    function registerOptionsReducers(store) {

        if (!store || !options.extraReducers || isEmptyObject(options.extraReducers)) {
            return;
        }

        registerReducers(store, options.extraReducers);

    }

    /**
     * Register extra models in options.
     * @param store
     */
    function registerOptionsModels(store) {

        if (!store || !options.extraModels || options.extraModels.length < 1) {
            return;
        }

        registerModels(store, options.extraModels);

    }

    /**
     * Register extra reducers in plugins.
     * @param store
     */
    function registerPluginsReducers(store) {

        if (!store || !plugins || plugins.length < 1) {
            return;
        }

        const reducers = plugins?.reduce((extraReducers, plugin) => ({
            ...extraReducers,
            ...plugin?.extraReducers
        }), {});

        if (!reducers || isEmptyObject(reducers)) {
            return;
        }

        registerReducers(store, reducers);

    }

    /**
     * Register extra models in plugins.
     * @param store
     */
    function registerPluginsModels(store) {

        if (!store || !plugins || plugins.length < 1) {
            return;
        }

        const models = plugins?.reduce((extraModels, plugin) => [
            ...extraModels,
            ...(plugin?.extraModels || [])
        ], []);

        if (!models || models.length < 1) {
            return;
        }

        registerModels(store, models);

    }

    /**
     * Create store
     * @returns {Object}
     */
    function createStore() {

        // Call beforeCreateStore in plugins
        handlePluginsHook(options, plugins, 'beforeCreateStore', options, plugins);

        // Create a vivy store
        const store = createVivyStore(options, plugins);

        // Register extra reducers in options
        registerOptionsReducers(store);

        // Register extra models in options
        registerOptionsModels(store);

        // Register extra reducers in plugins
        registerPluginsReducers(store);

        // Register extra models in plugins
        registerPluginsModels(store);

        // Add methods
        store.registerReducer = registerReducer.bind(null, store);
        store.registerReducers = registerReducers.bind(null, store);
        store.unregisterReducer = unregisterReducer.bind(null, store);
        store.unregisterReducers = unregisterReducers.bind(null, store);
        store.registerModel = registerModel.bind(null, store);
        store.registerModels = registerModels.bind(null, store);
        store.unregisterModel = unregisterModel.bind(null, store);
        store.unregisterModels = unregisterModels.bind(null, store);

        // Call onCreateStore in plugins
        handlePluginsHook(options, plugins, 'onCreateStore', store, options, plugins);

        return store;

    }

    return {

        options,

        plugins,

        use,

        createStore

    };

}
