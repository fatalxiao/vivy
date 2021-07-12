/**
 * @file AsyncComponentLoadingMiddleware.js
 */

// Action Types
import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoading';

/**
 * timeout duration
 * @type {number}
 */
const DURATION = 1000;

/**
 * component loading complete timeout id
 * @type {null}
 */
let timeoutId = null;

export default ({dispatch, getState}) => next => action => {

    if (!action) {
        return next(action);
    }

    // whether async component is loading
    const loading = getState()?.['@@VIVY/ASYNC_COMPONENT_LOADING'];

    // start loading
    if (action.type === ASYNC_COMPONENT_LOADING_START) {

        // clear timeout
        timeoutId && clearTimeout(timeoutId);

        // dispatch start loading component action
        !loading && next(action);

    }

    // loading complete
    else if (action.type === ASYNC_COMPONENT_LOADING_COMPLETE) {

        // clear time out
        timeoutId && clearTimeout(timeoutId);

        // set timeout
        timeoutId = setTimeout(() => {

            // clear time out
            timeoutId && clearTimeout(timeoutId);

            // dispatch loading component complete action
            next(action);

        }, DURATION);

    }

    // other actions
    else {
        return next(action);
    }

};
