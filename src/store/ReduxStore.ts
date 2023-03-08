/**
 * @file ReduxStore.ts
 */

// Redux
import {createStore, applyMiddleware} from 'redux';

// Types
import {Reducer, Middleware} from 'redux';
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
            ...(plugins?.reduce?.((pluginMiddlewares: Middleware[], plugin) => [
                ...pluginMiddlewares,
                ...(plugin.extraMiddlewares || [])
            ], []) || []),
            ...(options?.extraMiddlewares || [])
        )
    );
}
