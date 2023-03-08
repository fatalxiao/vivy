/**
 * @file ReduxStore.js
 */

// Redux
import {createStore, applyMiddleware, Reducer, Middleware} from 'redux';
import {VivyOption, VivyPlugin} from "src/types";

/**
 * Create Redux store
 * @param rootReducer
 * @param options
 * @param middlewares
 * @param plugins
 */
export default function createReduxStore(
    rootReducer: Reducer, options: VivyOption, middlewares: Middleware[], plugins: VivyPlugin[]
) {
    return createStore(
        rootReducer,
        options?.initialState || {},
        applyMiddleware(
            ...middlewares,
            // @ts-ignore
            ...(plugins?.reduce?.((pluginMiddlewares, plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []) || []),
            ...(options?.extraMiddlewares || [])
        )
    );
}
