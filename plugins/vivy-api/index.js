/**
 * @file index.js
 */

// Vivy Store
import createVivyStore from './store/VivyStore';

// Reducers
import createAsyncReducer from './reducers/ModelReducer';
import createRootReducer from './reducers/RootReducer';

// Models
import asyncComponentLoading from './models/asyncComponentLoading';
import apiStatus from './models/apiStatus';
import createModelApiActionMiddleware from '../../src/middlewares/ModelApiActionMiddleware';
import createRequestMiddleware from '../../src/middlewares/RequestMiddleware';
import createSuccessResponseMiddleware from '../../src/middlewares/SuccessResponseMiddleware';
import createFailureResponseMiddleware from '../../src/middlewares/FailureResponseMiddleware';

// Components
export AsyncComponent from './AsyncComponent';

// Statics
export ApiStatus from './statics/ApiStatus';

/**
 * Create Vivy instance
 * @param history
 * @returns {{}}
 */
export default function createVivyApiPlugin(options) {

    // 用于加载和调用异步 api 的 ModelApiActionMiddleware
    const ModelApiActionMiddleware = createModelApiActionMiddleware();

    return {
        extraMiddlewares: [
            ModelApiActionMiddleware,
            createRequestMiddleware(options?.checkResponseStatus),
            createSuccessResponseMiddleware(options?.successResponseHandler),
            createFailureResponseMiddleware(options?.failureResponseHandler)
        ],

    };

};
