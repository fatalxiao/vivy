export interface Plugin {

}

export interface VivyStore {

}

export interface VivyModel {

}

export interface VivyOption {

    /**
     * Initial state of store
     */
    initialState?: Object,

    /**
     * Register extra middlewares to Vivy
     */
    extraMiddlewares?: []

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

export function registerReducer(store?: VivyStore, nameSpace?: string, reducer?: Function): void

export function registerReducers(store?: VivyStore, reducer?: Function): void

export function unregisterReducer(store?: VivyStore, nameSpace?: string): void

export function unregisterReducers(store?: VivyStore, nameSpacesOrReducers?: string | Function): void

export function registerModel(store?: VivyStore, model?: VivyModel): void

export function registerModels(store?: VivyStore, models?: VivyModel[]): void

export function unregisterModel(store?: VivyStore, nameSpaceOrModel?: string | VivyModel): void

export function unregisterModels(store?: VivyStore, nameSpacesOrModels?: string[] | VivyModel[]): void

export default function Vivy(opts?: VivyOption): VivyInstance;
