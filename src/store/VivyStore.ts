/**
 * @file VivyStore.ts
 * @author Liangxiaojun
 */

// Middlewares
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// ReduxStore
import createReduxStore from './ReduxStore';

// Reducers
import createCreateRootReducer from '../reducers/RootReducer';

// Vendors
import {isEmptyObject} from '../util/Util';

// Types
import {VivyModel, VivyModelActionMapObject, VivyOption, VivyPlugin, VivyStore} from "src/types";
import {AnyAction, Reducer, ReducersMapObject} from "redux";

/**
 * Create Vivy store
 * @param options
 * @param plugins
 */
export default function createVivyStore(options: VivyOption, plugins: VivyPlugin[]): VivyStore {

    // All model actions
    // modelActions[modelNameSpace][actionName]: Action
    const modelActions = {};

    // Handle actions in models
    const ModelActionMiddleware = createModelActionMiddleware(modelActions);

    // Get create reducer method
    const createRootReducer = createCreateRootReducer(options);

    // Create origin redux store
    const reduxStore = createReduxStore(createRootReducer(), options, [ModelActionMiddleware], plugins);

    /**
     * Vivy store dispatch
     */
    function dispatch(action: AnyAction): any {

        // Handle action dispatch
        if (action?.type) {
            const result = action.type.split?.('/');
            if (result) {
                const [nameSpace, name] = result;
                if (
                    nameSpace && name && modelActions?.[nameSpace]?.[name]
                    && typeof modelActions[nameSpace][name] === 'function'
                ) {
                    return modelActions[nameSpace][name](action);
                }
            }
        }

        // Handle reducer dispatch
        return reduxStore.dispatch(action);

    }

    /**
     * Register Reducer
     * @param nameSpace
     * @param reducer
     */
    function registerReduxReducer(this: VivyStore, nameSpace: string, reducer: Reducer): Reducer | void {

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
     */
    function unregisterReduxReducer(this: VivyStore, nameSpace: string): Reducer | void {

        if (!this || !nameSpace) {
            return;
        }

        const nextReducers = {...this.asyncReducers} as ReducersMapObject;
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
    function registerModelGlobalReducersDispatcher(this: VivyStore, nameSpace: string, globalReducers: ReducersMapObject): void {

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
    function registerModelReducerDispatcher(this: VivyStore, nameSpace: string, reducers: ReducersMapObject): void {

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
    function registerModelActions(this: VivyStore, nameSpace: string, actions: VivyModelActionMapObject): void {

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
            modelActions[nameSpace][name] = this.dispatch[nameSpace][name] = (params: AnyAction) =>
                action(params)(this.dispatch, this.getState);
        });

    }

    /**
     * Unregister model actions
     * @param nameSpaceOrModel
     */
    function unregisterModelActions(this: VivyStore, nameSpaceOrModel: string | VivyModel): void {

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

        // Vivy store overload dispatch
        dispatch,

        // Vivy options
        options: options || {},

        // Async reducers
        asyncReducers: {},

        // Model actions
        modelActions,

        // Create reducer
        createRootReducer,

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

    } as VivyStore;

}
