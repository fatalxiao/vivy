/**
 * @file RequestMiddleware.js
 */

import {CALL_API, CALL_API_SUCCESS, CALL_API_FAILURE} from '../actionTypes/CallApi';

export default function createRequestMiddleware() {

    return ({dispatch, getState}) => next => async action => {

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

        // call api
        const response = await api(restOptions);

        console.log(response);

        if (response.status >= 200 && response.status < 300) {

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

        // api({
        //     header,
        //     params,
        //     contentType,
        //     successCallback(xhr, response, responseData) {
        //
        //         !resMsgDisabled && !successResMsgDisabled && dispatch({
        //             type: 'responseMessage/addSuccessResMsg'
        //         });
        //
        //         next(actionWith({
        //             ...restOptions,
        //             type: successType,
        //             responseData,
        //             response,
        //             xhr
        //         }));
        //
        //         actionSuccessCallback?.(responseData, response, xhr);
        //
        //     },
        //     failureCallback(xhr, response, responseData) {
        //
        //         if (!resMsgDisabled && !failureResMsgDisabled) {
        //             if (xhr.status === 500) {
        //                 dispatch({
        //                     type: 'responseMessage/addFailureResMsg'
        //                 });
        //             } else {
        //                 dispatch({
        //                     type: 'responseMessage/addFailureResMsg',
        //                     message: responseData
        //                 });
        //             }
        //         }
        //
        //         next(actionWith({
        //             ...restOptions,
        //             type: failureType,
        //             responseData,
        //             response,
        //             xhr,
        //             error: response ?
        //                 (responseData || response.message)
        //                 :
        //                 'Server or Network failure. Please try again later or contact your account manager.'
        //         }));
        //
        //         actionFailureCallback?.(responseData, response, xhr);
        //
        //     }
        // });

    };

}
