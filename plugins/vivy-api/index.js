/**
 * @file index.js
 */

// Models
import apiStatus from './models/apiStatus';

// Middlewares
import createModelApiActionMiddleware from './middlewares/ModelApiActionMiddleware';
import createRequestMiddleware from './middlewares/RequestMiddleware';
import createSuccessResponseMiddleware from './middlewares/SuccessResponseMiddleware';
import createFailureResponseMiddleware from './middlewares/FailureResponseMiddleware';

// Vendors
import {registerModel} from '../../src';

// Statics
export ApiStatus from './statics/ApiStatus';

/**
 * Create Vivy api plugin
 * @param options
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
        extraModels: [
            apiStatus
        ],
        onRegisterModel: model => {

            const {nameSpace, apis} = model;

            // register api actions
            if (apis) {
                ModelApiActionMiddleware.register(nameSpace, apis || {});
            }

        }
    };

};
