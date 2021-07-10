/**
 * @file RequestMiddleware.js
 */

import {CALL_API, CALL_API_SUCCESS, CALL_API_FAILURE} from '../actionTypes/CallApi';

function defaultCheckStatus(response) {
    return response.status >= 200 && response.status < 300;
}

export default function createRequestMiddleware(checkStatus) {

    return () => next => async action => {

        const options = action[CALL_API];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }

        const {types, api, ...restOptions} = options,
            [requestType, successType, failureType] = types;

        /**
         * calculate action data
         * @param data
         * @returns {*}
         */
        function actionWith(data) {
            const finalAction = Object.assign({}, action, data);
            delete finalAction[CALL_API];
            return finalAction;
        }

        // next request action
        next(actionWith({type: requestType}));

        // call api and get response
        const response = await api(restOptions);
        const responseData = await response.json();

        if (
            checkStatus && typeof checkStatus === 'function' ?
                checkStatus(response, responseData)
                :
                defaultCheckStatus(response)
        ) {

            next(actionWith({
                originAction: {
                    ...restOptions,
                    api
                },
                type: CALL_API_SUCCESS,
                successType,
                response
            }));

        } else {

            next(actionWith({
                originAction: {
                    ...restOptions,
                    api
                },
                type: CALL_API_FAILURE,
                failureType,
                response
            }));

        }

    };

}
