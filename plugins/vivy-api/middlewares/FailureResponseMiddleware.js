/**
 * @file FailureResponseMiddleware.js
 */

import {CALL_API_FAILURE} from '../actionTypes/CallApi';

export default function createFailureResponseMiddleware(failureResponseHandler) {
    return ({dispatch, getState}) => next => action => {

        const options = action[CALL_API_FAILURE];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }

        if (failureResponseHandler && typeof failureResponseHandler === 'function') {
            return failureResponseHandler({dispatch, getState})(next)(options);
        }

        next(options);

    };
}
