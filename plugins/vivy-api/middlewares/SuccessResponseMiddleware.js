/**
 * @file SuccessResponseMiddleware.js
 */

import {CALL_API_SUCCESS} from '../actionTypes/CallApi';

export default function createSuccessResponseMiddleware(successResponseHandler) {
    return ({dispatch, getState}) => next => action => {

        const options = action[CALL_API_SUCCESS];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }

        if (successResponseHandler && typeof successResponseHandler === 'function') {
            return successResponseHandler({dispatch, getState})(next)(options);
        }

        next(options);

    };
}
