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

    // Create origin redux store
    const reduxStore = createReduxStore(options, plugins);

    /**
     * Vivy store dispatch
     * @returns {*}
     */
    function dispatch() {

        // if (this.modelActions) {
        //
        // }



        return reduxStore.dispatch.apply(this, arguments);

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

        // if (!this.modelActions[nameSpace]) {
        //     this.modelActions[nameSpace] = {};
        // }

        Object.entries(actions).forEach(([name, action]) => {
            // this.modelActions[nameSpace][name] = action;
            this.dispatch[nameSpace][name] = params => action(params)(this.dispatch, this.getState);
        });

    }

    function unregisterReduxActions(nameSpaceOrModel) {

        if (!this) {
            return;
        }

        if (typeof nameSpaceOrModel === 'string') {
            // delete this.modelActions[nameSpaceOrModel];
            delete this.dispatch[nameSpaceOrModel];
        } else if (nameSpaceOrModel?.nameSpace) {
            // delete this.modelActions[nameSpaceOrModel.nameSpace];
            delete this.dispatch[nameSpaceOrModel.nameSpace];
        }

    }

    return {

        // Store
        ...reduxStore,

        // Origin store
        originStore: reduxStore,

        dispatch,

        // Vivy options
        options: options || {},

        // Async reducers
        asyncReducers: {},

        // Model actions
        // modelActions: {},

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
