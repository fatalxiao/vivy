/**
 * @file VivyStore.js
 */

// ReduxStore
import createReduxStore from './ReduxStore';

// Middlewares
// import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';

/**
 * Create Vivy store
 * @param options {Object}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createVivyStore(options, plugins) {

    // Handle actions in models
    // const ModelActionMiddleware = createModelActionMiddleware();

    const modelActions = {};

    // Create origin redux store
    const reduxStore = createReduxStore(options, plugins);

    /**
     * Vivy store dispatch
     * @returns {*}
     */
    function dispatch(action) {

        const [nameSpace, name] = action?.type?.split?.('/');
        if (nameSpace && name && modelActions?.[nameSpace]?.[name]) {
            return modelActions?.[nameSpace]?.[name]?.(action)?.(this.dispatch, this.getState);
        }

        return reduxStore.dispatch(action || {});

    }

    /**
     * Register Reducer
     * @param nameSpace
     * @param reducer
     * @returns {*}
     */
    function registerReduxReducer(nameSpace, reducer) {

        if (!this) {
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

        if (!this) {
            return;
        }

        const nextReducers = {...this.asyncReducers};
        const unregisteredReducer = nextReducers[nameSpace];

        delete nextReducers[nameSpace];
        this.replaceReducer(createRootReducer(nextReducers));

        return unregisteredReducer;

    }

    function registerReduxActions(nameSpace, actions) {

        if (!this) {
            return;
        }

        if (!modelActions[nameSpace]) {
            modelActions[nameSpace] = {};
        }

        Object.entries(actions).forEach(([name, action]) => {
            modelActions[nameSpace][name] = action;
            this.dispatch[nameSpace][name] = params => action(params)(this.dispatch, this.getState);
        });

    }

    function unregisterReduxActions(nameSpaceOrModel) {

        if (!this) {
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

        // Register actions
        registerReduxActions,

        // Unregister actions
        unregisterReduxActions,

        // All registered plugins
        plugins: plugins || []

    };

}
