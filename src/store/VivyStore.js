/**
 * @file VivyStore.js
 */

// Middlewares
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// ReduxStore
import createReduxStore from './ReduxStore';

// Reducers
import createRootReducer from '../reducers/RootReducer';

// Vendors
import {isEmptyObject} from '../util/Util';

/**
 * Create Vivy store
 * @param options {Object}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createVivyStore(options, plugins) {

    // All model actions
    // modelActions[modelNameSpace][actionName]: Action
    const modelActions = {};

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware(modelActions);

    // Create origin redux store
    const reduxStore = createReduxStore(options, [ModelActionMiddleware], plugins);

    /**
     * Vivy store dispatch
     * @returns {*}
     */
    function dispatch(action) {

        // Handle action dispatch
        if (action?.type) {
            const [nameSpace, name] = action.type.split?.('/');
            if (
                nameSpace && name && modelActions?.[nameSpace]?.[name]
                && typeof modelActions[nameSpace][name] === 'function'
            ) {
                return modelActions[nameSpace][name](action);
            }
        }

        // Handle reducer dispatch
        return reduxStore.dispatch(action || {});

    }

    /**
     * Register Reducer
     * @param nameSpace
     * @param reducer
     * @returns {*}
     */
    function registerReduxReducer(nameSpace, reducer) {

        if (!this || !nameSpace || !reducer) {
            return;
        }

        this.asyncReducers[nameSpace] = reducer;
        this.replaceReducer(createRootReducer(this.asyncReducers));

        return reducer;

    }

    /**
     * Unregister reducer
     * @param nameSpace
     * @returns {*}
     */
    function unregisterReduxReducer(nameSpace) {

        if (!this || !nameSpace) {
            return;
        }

        const nextReducers = {...this.asyncReducers};
        const unregisteredReducer = nextReducers[nameSpace];

        delete nextReducers[nameSpace];
        this.replaceReducer(createRootReducer(nextReducers));

        return unregisteredReducer;

    }

    /**
     * Register model global reducer dispatcher
     * @param nameSpace
     * @param globalReducers
     */
    function registerModelGlobalReducersDispatcher(nameSpace, globalReducers) {

        if (!this || !nameSpace || !globalReducers || isEmptyObject(globalReducers)) {
            return;
        }

        Object.keys(globalReducers).forEach(name => {
            this.dispatch[name] = (params = {}) => this.dispatch({
                ...params,
                type: name
            });
        });

    }

    /**
     * Register model reducer dispatcher
     * @param nameSpace
     * @param reducers
     */
    function registerModelReducerDispatcher(nameSpace, reducers) {

        if (!this || !nameSpace || !reducers || isEmptyObject(reducers)) {
            return;
        }

        if (!this.dispatch[nameSpace]) {
            this.dispatch[nameSpace] = {};
        }

        Object.keys(reducers).forEach(name => {
            this.dispatch[nameSpace][name] = (params = {}) => this.dispatch({
                ...params,
                type: `${nameSpace}/${name}`
            });
        });

    }

    /**
     * Register model actions
     * @param nameSpace
     * @param actions
     */
    function registerModelActions(nameSpace, actions) {

        if (!this || !nameSpace || !actions || isEmptyObject(actions)) {
            return;
        }

        if (!modelActions[nameSpace]) {
            modelActions[nameSpace] = {};
        }

        if (!this.dispatch[nameSpace]) {
            this.dispatch[nameSpace] = {};
        }

        Object.entries(actions).forEach(([name, action]) => {
            modelActions[nameSpace][name] = this.dispatch[nameSpace][name] = (params = {}) =>
                action(params)(this.dispatch, this.getState);
        });

    }

    /**
     * Unregister model actions
     * @param nameSpaceOrModel
     */
    function unregisterModelActions(nameSpaceOrModel) {

        if (!this || !nameSpaceOrModel) {
            return;
        }

        if (typeof nameSpaceOrModel === 'string') {
            delete modelActions[nameSpaceOrModel];
            delete this.dispatch[nameSpaceOrModel];
        } else if (nameSpaceOrModel?.nameSpace) {
            delete modelActions[nameSpaceOrModel.nameSpace];
            delete this.dispatch[nameSpaceOrModel.nameSpace];
        }

    }

    return {

        // Store
        ...reduxStore,

        // Redux store
        reduxStore,

        dispatch,

        // Vivy options
        options: options || {},

        // Async reducers
        asyncReducers: {},

        // Model actions
        modelActions,

        // Register reducers
        registerReduxReducer,

        // Unregister reducers
        unregisterReduxReducer,

        // Register model global reducers dispatcher
        registerModelGlobalReducersDispatcher,

        // Register model reducers dispatcher
        registerModelReducerDispatcher,

        // Register model actions
        registerModelActions,

        // Unregister model actions
        unregisterModelActions,

        // All registered plugins
        plugins: plugins || []

    };

}
