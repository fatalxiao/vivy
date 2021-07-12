/**
 * @file index.js
 */

// Models
import asyncComponentLoading from './models/asyncComponentLoading';

// Middlewares
import AsyncComponentLoadingMiddleware from './middlewares/AsyncComponentLoadingMiddleware';

// Components
export AsyncComponent from './components/AsyncComponent';

/**
 * Create Vivy async component plugin
 * @param options
 * @returns {{}}
 */
export default function createVivyAsyncComponentPlugin(options) {
    return {
        extraMiddlewares: [
            AsyncComponentLoadingMiddleware
        ],
        extraModels: [
            asyncComponentLoading
        ]
    };
};
