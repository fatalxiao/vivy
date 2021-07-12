/**
 * @file RequestMiddleware.js
 */

import {
    CALL_API, CALL_API_PARAMS, CALL_API_SUCCESS, CALL_API_FAILURE,
    API_STATUS_REQUEST, API_STATUS_SUCCESS, API_STATUS_FAILURE
} from '../actionTypes/CallApi';

function defaultCheckResponseStatus(response) {
    return response.status >= 200 && response.status < 300;
}

export default function createRequestMiddleware(checkResponseStatus) {
    return ({dispatch}) => next => async action => {

        const options = action[CALL_API];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }

        const {[CALL_API_PARAMS]: callApiParams, api, params, ...restOptions} = options,
            {nameSpace, apiActionName, types} = callApiParams,
            [requestType, successType, failureType] = types;

        // next request action
        next({
            ...restOptions,
            type: requestType
        });
        dispatch({
            type: API_STATUS_REQUEST,
            nameSpace,
            apiActionName
        });

        // call api and get response
        const response = await api(params);

        if (
            checkResponseStatus && typeof checkResponseStatus === 'function' ?
                checkResponseStatus(response)
                :
                defaultCheckResponseStatus(response)
        ) {
            next({
                [CALL_API_SUCCESS]: {
                    ...restOptions,
                    type: successType,
                    response
                }
            });
            dispatch({
                type: API_STATUS_SUCCESS,
                nameSpace,
                apiActionName
            });
        } else {
            next({
                [CALL_API_FAILURE]: {
                    ...restOptions,
                    type: failureType,
                    response
                }
            });
            dispatch({
                type: API_STATUS_FAILURE,
                nameSpace,
                apiActionName
            });
        }

    };
}
