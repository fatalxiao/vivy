/**
 * @file RequestMiddleware.js
 */

import {CALL_API, CALL_API_SUCCESS, CALL_API_FAILURE} from '../actionTypes/CallApi';

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

        const {types, api, ...restOptions} = options,
            [requestType, successType, failureType] = types;

        // next request action
        dispatch({
            ...restOptions,
            type: requestType
        });

        // call api and get response
        const response = await api(restOptions);
        const responseData = await response.json();

        if (
            checkResponseStatus && typeof checkResponseStatus === 'function' ?
                checkResponseStatus(response, responseData)
                :
                defaultCheckResponseStatus(response)
        ) {
            dispatch({
                [CALL_API_SUCCESS]: {
                    ...restOptions,
                    type: successType,
                    response,
                    responseData
                }
            });
        } else {
            dispatch({
                [CALL_API_FAILURE]: {
                    ...restOptions,
                    type: failureType,
                    response,
                    responseData
                }
            });
        }

    };

}
