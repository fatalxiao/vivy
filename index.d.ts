import {
    Reducer, Middleware, MiddlewareAPI, Action, Store
} from 'redux';

export interface VivyStore extends Store {
    originStore?: Store,
    plugins?: Plugin[],
    registerReducer: (nameSpace?: string, reducer?: Reducer) => void,
    registerReducers: (reducer?: Reducer) => void,
    unregisterReducer: (nameSpace?: string) => void
    unregisterReducers: (nameSpacesOrReducers?: string[] | Reducer[]) => void,
    registerModel: (model?: VivyModel) => void,
    registerModels: (models?: VivyModel[]) => void,
    unregisterModel: (nameSpaceOrModel?: string | VivyModel) => void,
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
    nameSpace?: string,
    state?: any,
    actions?: VivyModelActions,
    reducers?: VivyModelReducers
}

export interface VivyOption {

    /**
     * Initial state of store
     */
    initialState?: Object,

    /**
     * Register extra middlewares to Vivy
     */
    extraMiddlewares?: Middleware[]

}

export interface VivyInstance {

    /**
     * Vivy options
     */
    options?: VivyOption,

    /**
     * Vivy plugins
     */
    plugins?: Plugin[],

    /**
     * Register Vivy plugin to Vivy
     * @param plugin
     */
    use: (plugin: Plugin) => void,

    /**
     * Generate Vivy store
     */
    createStore: () => VivyStore

}

export interface Plugin {
    extraReducers: VivyModelReducers,
    extraModels: VivyModel[],
    extraMiddlewares: Middleware[],
    extraStoreProps: Object,
    onCreateStore?: (onCreateStore?: VivyStore) => void,
    onRegisterReducer?: (reducer?: VivyModelReducer, nameSpace?: string, store?: VivyStore) => void,
    onUnregisterReducer?: (unregisteredReducer?: VivyModelReducer, nameSpace?: string, store?: VivyStore) => void,
    onRegisterModel?: (model?: VivyModel, store?: VivyStore) => void,
    onUnregisterModel?: (unregisteredModel?: VivyModel, store?: VivyStore) => void,
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
 * @param reducer
 */
export function registerReducers(store?: VivyStore, reducer?: Reducer): void

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
export function unregisterReducers(store?: VivyStore, nameSpacesOrReducers?: string[] | Reducer[]): void

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
 * Create Vivy Instance
 * @param opts
 * @constructor
 */
export default function Vivy(opts?: VivyOption): VivyInstance;
