/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import BuildInModelReducers from './reducers/BuildInModelReducers';
import createModelReducer from './reducers/ModelReducer';

// Utils
import {isEmptyObject} from './util/Util';

// Types
import {Reducer, ReducersMapObject} from 'redux';
import {HookName, VivyModel, VivyOption, VivyPlugin, VivyStore} from './types'

// ActionTypes
export * from './actionTypes/VivyActionType';
export * from './actionTypes/VivyOptionActionType';

// ReducerNameSpaces
export * from './reducers/ReducerNameSpace';

/**
 * Handle Vivy hooks in options and plugins.
 * @param options
 * @param plugins
 * @param hookName
 * @param args
 */
function handlePluginsHook(options: VivyOption, plugins: VivyPlugin[], hookName: HookName, ...args: any[]) {
    options?.[hookName]?.(...args);
    plugins?.forEach?.(plugin => plugin?.[hookName]?.(...args));
}

/**
 * Register reducer
 * @param store
 * @param nameSpace
 * @param reducer
 */
export function registerReducer(store: VivyStore, nameSpace: string, reducer: Reducer) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpace) {
        console.error('NameSpace of reducer is required.');
        return;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!store.options?.overwriteSameNameSpaceModel && store.asyncReducers.hasOwnProperty(nameSpace)) {
        // console.error('Same nameSpace reducer already exists.');
        return;
    }

    // Register or overwrite Redux reducers
    store.registerReduxReducer(nameSpace, reducer);

    // Call onRegisterReducer in plugins
    handlePluginsHook(
        store.options, store.plugins, HookName.onRegisterReducer,
        reducer, nameSpace, store
    );

}

/**
 * Register reducers
 * @param store
 * @param reducers
 */
export function registerReducers(store: VivyStore, reducers: ReducersMapObject) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!reducers) {
        console.error('Reducers is required.');
        return;
    }

    Object.entries(reducers).forEach(([nameSpace, reducer]) =>
        registerReducer(store, nameSpace, reducer)
    );

}

/**
 * Unregister reducer
 * @param store
 * @param nameSpace
 */
export function unregisterReducer(store: VivyStore, nameSpace: string) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpace) {
        console.error('NameSpace of reducer is required.');
        return;
    }

    // Unregister Redux reducer
    const unregisteredReducer = store?.unregisterReduxReducer?.(nameSpace);

    // Call onUnregisterReducer in plugins
    handlePluginsHook(
        store.options, store.plugins, HookName.onUnregisterReducer,
        unregisteredReducer, nameSpace, store
    );

}

/**
 * Unregister reducers
 * @param store
 * @param nameSpacesOrReducers
 */
export function unregisterReducers(store: VivyStore, nameSpacesOrReducers: string[] | ReducersMapObject) {

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
 * @param store
 * @param model
 */
export function registerModel(store: VivyStore, model: VivyModel) {

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

    // Add build-in model reducers
    const allReducers = {
        ...BuildInModelReducers,
        ...reducers
    };

    // Register or overwrite Redux reducers
    store.registerReduxReducer(nameSpace, createModelReducer(
        store,
        nameSpace,
        state ?? null,
        globalReducers ?? {},
        allReducers ?? {}
    ));

    // Bind global reducers to vivyStore.dispatch to implement "dispatch.globalReducerName()"
    store.registerModelGlobalReducersDispatcher(nameSpace, globalReducers);

    // Bind reducers to vivyStore.dispatch to implement "dispatch.nameSpace.reducerName()"
    store.registerModelReducerDispatcher(nameSpace, allReducers);

    // Register model actions
    if (actions) {
        store.registerModelActions(nameSpace, actions ?? {});
    }

    // Call onRegisterModel in plugins
    handlePluginsHook(
        store.options, store.plugins, HookName.onRegisterModel,
        model, store
    );

}

/**
 * Register models
 * @param store
 * @param models
 */
export function registerModels(store: VivyStore, models: VivyModel[]) {

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
 * @param store
 * @param nameSpaceOrModel
 */
export function unregisterModel(store: VivyStore, nameSpaceOrModel: string | VivyModel) {

    if (!store) {
        console.error('Store is required.');
        return;
    }

    if (!nameSpaceOrModel) {
        console.error('NameSpace or model is required.');
        return;
    }

    // Unregister Redux reducers
    const unregisteredModel = typeof nameSpaceOrModel === 'string' ?
        store.unregisterReduxReducer(nameSpaceOrModel)
        :
        store.unregisterReduxReducer(nameSpaceOrModel.nameSpace);

    // Unregister model actions
    store.unregisterModelActions(nameSpaceOrModel);

    // Call onUnregisterModel in plugins
    handlePluginsHook(
        store.options, store.plugins, HookName.onUnregisterModel,
        unregisteredModel, store
    );

}

/**
 * Unregister models
 * @param store
 * @param nameSpacesOrModels
 */
export function unregisterModels(store: VivyStore, nameSpacesOrModels: string[] | VivyModel[]) {

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
 */
// function bindActionCreator(actionCreator, dispatch: Dispatch) {
//     return function () {
//         return dispatch(actionCreator.apply(this, arguments));
//     };
// }

/**
 * Build action or reducer methods with dispatch
 * @param modelActionCreator {string}
 * @param dispatch {Function}
 * @returns {Function}
 */
// function bindModelActionCreator(modelActionCreator, dispatch) {
//
//     if (!modelActionCreator) {
//         return;
//     }
//
//     if (!dispatch || typeof dispatch !== 'function') {
//         console.error('Dispatch is required.');
//         return;
//     }
//
//     const [nameSpace, name] = modelActionCreator.split('/');
//
//     return function () {
//
//         if (name === undefined) {
//             return dispatch?.[nameSpace]?.apply?.(this, arguments);
//         }
//
//         return dispatch?.[nameSpace]?.[name]?.apply?.(this, arguments);
//
//     };
//
// }

/**
 * Build actions or reducers methods with dispatch, and bind them into your props
 * Just like "bindActionCreators" in redux
 * @param modelActionCreators {Object}
 * @param dispatch {Function}
 * @returns {Object}
 */
// export function bindModelActionCreators(modelActionCreators, dispatch) {
//
//     if (!modelActionCreators) {
//         return null;
//     }
//
//     if (!dispatch || typeof dispatch !== 'function') {
//         console.error('Dispatch is required.');
//         return null;
//     }
//
//     if (typeof modelActionCreators === 'function') {
//         return bindActionCreator(modelActionCreators, dispatch);
//     }
//
//     if (typeof modelActionCreators !== 'object') {
//         return null;
//     }
//
//     const boundModelActionCreators = {};
//
//     Object.entries(modelActionCreators).forEach(([key, modelActionCreator]) => {
//         if (modelActionCreator === dispatch) {
//             boundModelActionCreators[key] = dispatch;
//         } else if (typeof modelActionCreator === 'function') {
//             boundModelActionCreators[key] = bindActionCreator(modelActionCreator, dispatch);
//         } else if (typeof modelActionCreator === 'string') {
//             boundModelActionCreators[key] = bindModelActionCreator(modelActionCreator, dispatch);
//         }
//     });
//
//     return boundModelActionCreators;
//
// }

/**
 * Default Vivy options
 * @type {{overwriteSameNameSpaceModel: boolean}}
 */
const DEFAULT_OPTIONS = {

    /**
     * Redux initial state
     */
    initialState: {},

    /**
     * Whether overwrite same name space model when registering ( Default false )
     */
    overwriteSameNameSpaceModel: false

};

/**
 * Create Vivy instance
 * @param opts
 * @constructor
 */
export default function Vivy(opts: VivyOption) {

    // Vivy options
    const options = {
        ...DEFAULT_OPTIONS,
        ...opts
    };

    // All Vivy plugins
    const plugins: VivyPlugin[] = [];

    /**
     * Use vivy plugin
     * @param plugin
     */
    function use(plugin: VivyPlugin) {

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
    function registerOptionsReducers(store: VivyStore) {

        if (!store || !options.extraReducers || isEmptyObject(options.extraReducers)) {
            return;
        }

        registerReducers(store, options.extraReducers);

    }

    /**
     * Register extra models in options.
     * @param store
     */
    function registerOptionsModels(store: VivyStore) {

        if (!store || !options.extraModels || options.extraModels.length < 1) {
            return;
        }

        registerModels(store, options.extraModels);

    }

    /**
     * Register extra reducers in plugins.
     * @param store
     */
    function registerPluginsReducers(store: VivyStore) {

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
    function registerPluginsModels(store: VivyStore) {

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
        handlePluginsHook(
            options, plugins, HookName.beforeCreateStore,
            options, plugins
        );

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
