/**
 * @file RequestMiddleware.js
 */

import {CALL_API, CALL_API_SUCCESS, CALL_API_FAILURE} from '../actionTypes/CallApi';

function defaultCheckResponseStatus(response) {
    return response.status >= 200 && response.status < 300;
}

export default function createRequestMiddleware(checkResponseStatus) {
    return () => next => async action => {

        const options = action[CALL_API];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }

        const {types, api, params, ...restOptions} = options,
            [requestType, successType, failureType] = types;

        // next request action
        next({
            ...restOptions,
            type: requestType
        });

        // call api and get response
        const response = await api(params);

        if (
            checkResponseStatus && typeof checkResponseStatus === 'function' ?
                checkResponseStatus(response, response.data)
                :
                defaultCheckResponseStatus(response)
        ) {
            next({
                [CALL_API_SUCCESS]: {
                    ...restOptions,
                    type: successType,
                    response,
                    responseData: response.data
                }
            });
        } else {
            next({
                [CALL_API_FAILURE]: {
                    ...restOptions,
                    type: failureType,
                    response,
                    responseData: response.data
                }
            });
        }

    };
}
