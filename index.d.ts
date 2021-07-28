import {
    Reducer, Middleware, MiddlewareAPI, Action, Store
} from 'redux';

export interface VivyStore extends Store {

    /**
     * Origin redux store
     */
    originStore?: Store,

    /**
     * All Vivy plugins
     */
    plugins?: Plugin[],

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
     * Vivy model actions, like action in redux
     */
    actions?: VivyModelActions,

    /**
     * Vivy model reducers, like reducers in redux
     */
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
 * @param options
 * @constructor
 */
export default function Vivy(options?: VivyOption): VivyInstance;
