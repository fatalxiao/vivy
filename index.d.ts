import {
    Reducer, Middleware, MiddlewareAPI, Action, Store, Dispatch
} from 'redux';

/**
 * VivyActionTypes
 */
export * from './dist/actionTypes/VivyActionType';
export * from './dist/actionTypes/VivyOptionActionType';

/**
 * VivyReducerNameSpace
 */
export * from './dist/reducers/ReducerNameSpace';

export interface VivyStore extends Store {

    /**
     * Origin Redux store
     */
    originStore?: Store,

    /**
     * All Vivy plugins
     */
    plugins?: VivyPlugin[],

    /**
     * Register reducer to Vivy
     * @param nameSpace
     * @param reducer
     */
    registerReducer: (nameSpace?: string, reducer?: Reducer) => void,

    /**
     * Register reducers to Vivy
     * @param reducer
     */
    registerReducers: (reducer?: Reducer) => void,

    /**
     * Unregister reducer
     * @param nameSpace
     */
    unregisterReducer: (nameSpace?: string) => void,

    /**
     * Unregister reducers
     * @param nameSpacesOrReducers
     */
    unregisterReducers: (nameSpacesOrReducers?: string[] | Reducer[]) => void,

    /**
     * Register model to Vivy
     * @param model
     */
    registerModel: (model?: VivyModel) => void,

    /**
     * Register models to Vivy
     * @param models
     */
    registerModels: (models?: VivyModel[]) => void,

    /**
     * Unregister model
     * @param nameSpaceOrModel
     */
    unregisterModel: (nameSpaceOrModel?: string | VivyModel) => void,

    /**
     * Unregister models
     * @param nameSpacesOrModels
     */
    unregisterModels: (nameSpacesOrModels?: string[] | VivyModel[]) => void

}

export interface VivyModelAction {
    (action?: Action): (api?: MiddlewareAPI<any>) => any
}

export interface VivyModelActions {
    [key: string]: VivyModelAction
}

export interface VivyModelReducer {
    (state?: any, action?: Action): any
}

export interface VivyModelReducers {
    [key: string]: VivyModelReducer
}

export interface VivyModel {

    /**
     * Vivy model nameSpace
     */
    nameSpace?: string,

    /**
     * Vivy model state
     */
    state?: any,

    /**
     * Vivy model actions, like action in Redux
     */
    actions?: VivyModelActions,

    /**
     * Vivy model global reducers, like reducers in Redux
     */
    globalReducers?: VivyModelReducers,

    /**
     * Vivy model reducers, like reducers in Redux
     */
    reducers?: VivyModelReducers

}

export interface Hooks {

    /**
     * Callback before create Vivy store
     * @param options
     * @param plugins
     */
    beforeCreateStore?: (options?: VivyOption, plugins?: VivyPlugin[]) => void,

    /**
     * Callback when create Vivy store
     * @param options
     * @param plugins
     */
    onCreateStore?: (store?: VivyStore) => void,

    /**
     * Callback when register reducer
     * @param options
     * @param plugins
     */
    onRegisterReducer?: (reducer?: VivyModelReducer, nameSpace?: string, store?: VivyStore) => void,

    /**
     * Callback when unregister reducer
     * @param unregisteredReducer
     * @param nameSpace
     * @param store
     */
    onUnregisterReducer?: (unregisteredReducer?: VivyModelReducer, nameSpace?: string, store?: VivyStore) => void,

    /**
     * Callback when register model
     * @param model
     * @param store
     */
    onRegisterModel?: (model?: VivyModel, store?: VivyStore) => void,

    /**
     * Callback when unregister model
     * @param unregisteredModel
     * @param store
     */
    onUnregisterModel?: (unregisteredModel?: VivyModel, store?: VivyStore) => void

}

export interface ExtraInfo {

    /**
     * Register extra reducers to Vivy
     */
    extraReducers: VivyModelReducers,

    /**
     * Register extra models to Vivy
     */
    extraModels: VivyModel[],

    /**
     * Register extra middlewares to Vivy
     */
    extraMiddlewares?: Middleware[]

}

export type VivyPlugin = ExtraInfo & Hooks & {

    /**
     * Use callback
     */
    onUse: (options?: VivyOption, plugins?: VivyPlugin[]) => void

};

export type VivyOption = ExtraInfo & Hooks & {

    /**
     * Initial state of store
     */
    initialState?: Object,

    /**
     * Whether overwrite same name space model when registering ( Default false )
     */
    overwriteSameNameSpaceModel?: boolean,

    /**
     * Use plugin callback
     */
    onUsePlugin: (plugin?: VivyPlugin, options?: VivyOption, plugins?: VivyPlugin[]) => void

}

export interface VivyInstance {

    /**
     * Vivy options
     */
    options?: VivyOption,

    /**
     * Vivy plugins
     */
    plugins?: VivyPlugin[],

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

/**
 * Register reducer to Vivy
 * @param store
 * @param nameSpace
 * @param reducer
 */
export function registerReducer(store?: VivyStore, nameSpace?: string, reducer?: Reducer): void

/**
 * Register reducers to Vivy
 * @param store
 * @param reducers
 */
export function registerReducers(store?: VivyStore, reducers?: VivyModelReducers): void

/**
 * Unregister reducer
 * @param store
 * @param nameSpace
 */
export function unregisterReducer(store?: VivyStore, nameSpace?: string): void

/**
 * Unregister reducers
 * @param store
 * @param nameSpacesOrReducers
 */
export function unregisterReducers(store?: VivyStore, nameSpacesOrReducers?: string[] | VivyModelReducers): void

/**
 * Register model to Vivy
 * @param store
 * @param model
 */
export function registerModel(store?: VivyStore, model?: VivyModel): void

/**
 * Register models to Vivy
 * @param store
 * @param models
 */
export function registerModels(store?: VivyStore, models?: VivyModel[]): void

/**
 * Unregister model
 * @param store
 * @param nameSpaceOrModel
 */
export function unregisterModel(store?: VivyStore, nameSpaceOrModel?: string | VivyModel): void

/**
 * Unregister models
 * @param store
 * @param nameSpacesOrModels
 */
export function unregisterModels(store?: VivyStore, nameSpacesOrModels?: string[] | VivyModel[]): void

/**
 * Build actions or reducers methods with dispatch, and bind them into your props
 * Just like "bindActionCreator" in Redux
 * @param modelActionCreators
 * @param dispatch
 */
export function bindModelActionCreators(modelActionCreators?: object, dispatch?: Dispatch): object

/**
 * Create Vivy Instance
 * @param options
 * @constructor
 */
export default function Vivy(options?: VivyOption): VivyInstance;
