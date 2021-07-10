/**
 * @file FailureResponseMiddleware.js
 */

import {CALL_API_SUCCESS} from '../actionTypes/CallApi';

export default function createFailureResponseMiddleware() {

    return () => next => async action => {

        const options = action[CALL_API_SUCCESS];

        // not an api action
        if (typeof options === 'undefined') {
            return next(action);
        }



    };

}
