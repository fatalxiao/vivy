import {
    Reducer, Middleware, Action, Store, Dispatch, ReducersMapObject, AnyAction
} from 'redux';

export enum HookName {
    beforeCreateStore = 'beforeCreateStore',
    onCreateStore = 'onCreateStore',
    onRegisterReducer = 'onRegisterReducer',
    onUnregisterReducer = 'onUnregisterReducer',
    onRegisterModel = 'onRegisterModel',
    onUnregisterModel = 'onUnregisterModel',
    onUse = 'onUse',
    onUsePlugin = 'onUsePlugin'
}

export interface VivyModelAction {
    (action: Action): (dispatch: VivyStoreDispatch, getState: () => any) => any
}

export interface VivyModelActionMapObject {
    [key: string]: VivyModelAction
}

export interface VivyModel {

    /**
     * Vivy model nameSpace
     */
    nameSpace: string,

    /**
     * Vivy model state
     */
    state: any,

    /**
     * Vivy model actions, like action in Redux
     */
    actions: VivyModelActionMapObject,

    /**
     * Vivy model global reducers, like reducers in Redux
     */
    globalReducers: ReducersMapObject,

    /**
     * Vivy model reducers, like reducers in Redux
     */
    reducers: ReducersMapObject

}

/**
 * Vivy store dispatch
 */
export interface VivyStoreDispatch {
    (action: AnyAction): any
}

/**
 * Vivy store dispatch
 */
export interface VivyStoreDispatch {
    (nameSpace: string): (name: string) => (action: AnyAction) => any
}

/**
 * Vivy store
 */
export interface VivyStore extends Store {

    /**
     * Origin Redux store
     */
    reduxStore: Store,

    /**
     * Vivy options
     */
    options: VivyOption,

    /**
     * All async reducers
     */
    asyncReducers: ReducersMapObject,

    /**
     * All models actions
     */
    modelActions: object,

    /**
     * A callback to create root reducer using "combineReducers"
     * @param reducers
     */
    createRootReducer: (reducers: ReducersMapObject) => Reducer

    /**
     * All Vivy plugins
     */
    plugins: VivyPlugin[],

    /**
     * Vivy store dispatch
     */
    dispatch: Dispatch | VivyStoreDispatch,

    /**
     * Vivy store getState
     */
    getState: () => any,

    /**
     * Register reducer to Vivy
     * @param nameSpace
     * @param reducer
     */
    registerReduxReducer: (nameSpace: string, reducer: Reducer) => void,

    /**
     * Unregister reducer
     * @param nameSpace
     */
    unregisterReduxReducer: (nameSpace: string) => void,

    /**
     * Register model global reducer dispatcher
     * @param nameSpace
     * @param globalReducers
     */
    registerModelGlobalReducersDispatcher: (nameSpace: string, globalReducers: ReducersMapObject) => void,

    /**
     * Register model reducer dispatcher
     * @param nameSpace
     * @param reducers
     */
    registerModelReducerDispatcher: (nameSpace: string, reducers: ReducersMapObject) => void,

    /**
     * Register model actions
     * @param models
     */
    registerModelActions: (nameSpace: string, actions: VivyModelActionMapObject) => void,

    /**
     * Unregister model actions
     * @param nameSpacesOrModel
     */
    unregisterModelActions: (nameSpacesOrModel: string | VivyModel) => void

}

export interface Hooks {

    /**
     * Callback before create Vivy store
     * @param options
     * @param plugins
     */
    [HookName.beforeCreateStore]: (options: VivyOption, plugins: VivyPlugin[]) => void,

    /**
     * Callback when create Vivy store
     * @param options
     * @param plugins
     */
    [HookName.onCreateStore]: (store: VivyStore) => void,

    /**
     * Callback when register reducer
     * @param options
     * @param plugins
     */
    [HookName.onRegisterReducer]: (reducer: Reducer, nameSpace: string, store: VivyStore) => void,

    /**
     * Callback when unregister reducer
     * @param unregisteredReducer
     * @param nameSpace
     * @param store
     */
    [HookName.onUnregisterReducer]: (unregisteredReducer: Reducer, nameSpace: string, store: VivyStore) => void,

    /**
     * Callback when register model
     * @param model
     * @param store
     */
    [HookName.onRegisterModel]: (model: VivyModel, store: VivyStore) => void,

    /**
     * Callback when unregister model
     * @param unregisteredModel
     * @param store
     */
    [HookName.onUnregisterModel]: (unregisteredModel: VivyModel, store: VivyStore) => void

}

export interface ExtraInfo {

    /**
     * Register extra reducers to Vivy
     */
    extraReducers: ReducersMapObject,

    /**
     * Register extra models to Vivy
     */
    extraModels: VivyModel[],

    /**
     * Register extra middlewares to Vivy
     */
    extraMiddlewares: Middleware[]

}

export type VivyPlugin = ExtraInfo & Hooks & {

    /**
     * Use callback
     */
    [HookName.onUse]: (options: VivyOption, plugins: VivyPlugin[]) => void,

    [Symbol.iterator](): Iterator<any>

};

export type VivyOption = ExtraInfo & Hooks & {

    /**
     * Initial state of store
     */
    initialState: object,

    /**
     * Whether overwrite same name space model when registering ( Default false )
     */
    overwriteSameNameSpaceModel: boolean,

    /**
     * Use plugin callback
     */
    [HookName.onUsePlugin]: (plugin: VivyPlugin, options: VivyOption, plugins: VivyPlugin[]) => void

}

export interface VivyInstance {

    /**
     * Vivy options
     */
    options: VivyOption,

    /**
     * Vivy plugins
     */
    plugins: VivyPlugin[],

    /**
     * Register Vivy plugin to Vivy
     * @param plugin
     */
    use: (plugin: VivyPlugin) => void,

    /**
     * Generate Vivy store
     */
    createStore: () => VivyStore

}

// /**
//  * Register reducer to Vivy
//  * @param store
//  * @param nameSpace
//  * @param reducer
//  */
// export function registerReducer(store: VivyStore, nameSpace: string, reducer: Reducer): void
//
// /**
//  * Register reducers to Vivy
//  * @param store
//  * @param reducers
//  */
// export function registerReducers(store: VivyStore, reducers: ReducersMapObject): void
//
// /**
//  * Unregister reducer
//  * @param store
//  * @param nameSpace
//  */
// export function unregisterReducer(store: VivyStore, nameSpace: string): void
//
// /**
//  * Unregister reducers
//  * @param store
//  * @param nameSpacesOrReducers
//  */
// export function unregisterReducers(store: VivyStore, nameSpacesOrReducers: string[] | ReducersMapObject): void
//
// /**
//  * Register model to Vivy
//  * @param store
//  * @param model
//  */
// export function registerModel(store: VivyStore, model: VivyModel): void
//
// /**
//  * Register models to Vivy
//  * @param store
//  * @param models
//  */
// export function registerModels(store: VivyStore, models: VivyModel[]): void
//
// /**
//  * Unregister model
//  * @param store
//  * @param nameSpaceOrModel
//  */
// export function unregisterModel(store: VivyStore, nameSpaceOrModel: string | VivyModel): void
//
// /**
//  * Unregister models
//  * @param store
//  * @param nameSpacesOrModels
//  */
// export function unregisterModels(store: VivyStore, nameSpacesOrModels: string[] | VivyModel[]): void
//
// /**
//  * Build actions or reducers methods with dispatch, and bind them into your props
//  * Just like "bindActionCreator" in Redux
//  * @param modelActionCreators
//  * @param dispatch
//  */
// export function bindModelActionCreators(modelActionCreators: object, dispatch: Dispatch): object
//
// /**
//  * Create Vivy Instance
//  * @param options
//  * @constructor
//  */
// export default function Vivy(options: VivyOption): VivyInstance;
