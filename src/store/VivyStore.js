/**
 * @file VivyStore.js
 */

// ReduxStore
import createReduxStore from './ReduxStore';

// Reducers
import createRootReducer from '../reducers/RootReducer';

/**
 * Create Vivy store
 * @param options {Object}
 * @param plugins {Array}
 * @returns {Object}
 */
export default function createVivyStore(options, plugins) {

    // All model actions
    // [modelNameSpace][actionName]: Action
    const modelActions = {};

    // Create origin redux store
    const reduxStore = createReduxStore(options, plugins);

    /**
     * Vivy store dispatch
     * @returns {*}
     */
    function dispatch(action) {

        // Handle action dispatch
        if (action?.type) {
            const [nameSpace, name] = action.type.split?.('/');
            if (nameSpace && name && modelActions?.[nameSpace]?.[name]) {
                return modelActions?.[nameSpace]?.[name]?.(action);
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

    /**
     * Register Redux actions
     * @param nameSpace
     * @param actions
     */
    function registerReduxActions(nameSpace, actions) {

        if (!this) {
            return;
        }

        if (!modelActions[nameSpace]) {
            modelActions[nameSpace] = {};
        }

        Object.entries(actions).forEach(([name, action]) => {
            modelActions[nameSpace][name] = this.dispatch[nameSpace][name] = params =>
                action(params)(this.dispatch, this.getState);
        });

    }

    /**
     * Unregister Redux actions
     * @param nameSpaceOrModel
     */
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
